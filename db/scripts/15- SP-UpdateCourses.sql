USE studentcompass

GO

-- Conditional removal of the SP and TVP type

IF OBJECT_ID('app.update_courses', 'P') IS NOT NULL DROP PROCEDURE app.update_courses;

IF EXISTS(SELECT * FROM sys.types 
WHERE is_table_type = 1 AND name = 'exams_table' AND schema_id = SCHEMA_ID('app'))
BEGIN
    DROP TYPE app.exams_table;
END;

-- Table-valued parameter creation

CREATE TYPE app.exams_table AS TABLE
(
	exam_course_id INT,
	exam_id TINYINT,
	taken_on DATE,
	grade TINYINT NOT NULL
);

GO

CREATE OR ALTER PROCEDURE app.update_courses
@course_id INT,
@year SMALLINT,
@term_id TINYINT,
@status_id TINYINT,
@student_id SMALLINT,
@final_grade TINYINT,
@subject_code SMALLINT,
@career_plan_id TINYINT,
@exams_table_param app.exams_table READONLY
AS
BEGIN

DECLARE @is_valid BIT;
DECLARE @existing_course_status TINYINT = 0;
DECLARE @transversal_career_plan_id TINYINT = 0;
DECLARE @approved_status_id TINYINT = 1;
DECLARE @coursing_status_id TINYINT = 2;
DECLARE @available_status_id TINYINT = 5;
DECLARE @error_message VARCHAR(150);

BEGIN TRY
BEGIN TRAN

-- Check subject
SELECT @is_valid = CASE WHEN EXISTS(
	SELECT 1 FROM app.subject WHERE code = @subject_code AND career_plan_id = @career_plan_id
	) THEN 1 ELSE 0 END;
IF @is_valid = 0
BEGIN 
	SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' does not exist or does not belong to the provided career plan.');
	;THROW 50001, @error_message, 1;
   END

-- Check student
SELECT @is_valid = CASE WHEN EXISTS(
	SELECT 1 FROM app.enrolled WHERE student_id = @student_id 
	AND (career_plan_id = @career_plan_id OR @career_plan_id = @transversal_career_plan_id)
	) THEN 1 ELSE 0 END;
IF @is_valid = 0
BEGIN 
	SET @error_message = CONCAT('Student with ID = ', CAST(@student_id AS NVARCHAR), 
	' does not exist or is not enrolled in the provided career plan with ID = ', CAST(@career_plan_id AS NVARCHAR));
	;THROW 50002, @error_message, 1;
END;

-- Check status
SELECT @is_valid = CASE WHEN EXISTS(
	SELECT 1 FROM app.course_status WHERE @status_id = id
	) THEN 1 ELSE 0 END;
IF @is_valid = 0
BEGIN 
	SET @error_message = CONCAT('Status with ID = ', CAST(@status_id AS NVARCHAR), ' does not exist.');
	;THROW 50003, @error_message, 1;
END;

-- Check grade
SELECT @is_valid = CASE WHEN ((@status_id = @approved_status_id AND @final_grade IN (4,5,6,7,8,9,10)) 
OR (@status_id <> @approved_status_id AND @final_grade IS NULL)
	) THEN 1 ELSE 0 END;
IF @is_valid = 0
BEGIN 
	SET @error_message = 'Final grade must be between 4-10 if the status is approved. Otherwise, null.';
	;THROW 50004, @error_message, 1;
END;

-- Check year
SELECT @is_valid = CASE WHEN @year > 1988 AND @year < YEAR(GETDATE()) 
AND @year > (SELECT enrollment_date FROM app.enrolled)
THEN 1 ELSE 0 END;
IF @is_valid = 0
BEGIN 
	;THROW 50007, 'Year must be greater than 1988 and not in the future!', 1;
END;

-- Check term
SELECT @is_valid = CASE WHEN @term_id IN ( SELECT id FROM app.term )
THEN 1 ELSE 0 END;
IF @is_valid = 0
BEGIN
	;THROW 50008, 'Invalid term id.', 1;
END;

-- Check successor subjects dates
SELECT @is_valid = CASE WHEN NOT EXISTS (
SELECT 1 FROM app.get_successor_subjects(@career_plan_id,@subject_code) ss
JOIN app.course c ON c.id = ss.subject_code
WHERE student_id = @student_id AND career_plan_id = @career_plan_id
AND app.validate_course_dates(@term_id,c.term_id,@year,c.year) = 0) 
THEN 1 ELSE 0 END;
IF @is_valid = 0
BEGIN 
	;THROW 50009, 'This course cannot happen after successor subjects courses dates (coursed status maybe can).', 1;
END;

-- Check precursor subjects dates
SELECT @is_valid = CASE WHEN NOT EXISTS (
SELECT 1 FROM app.get_precursor_subjects(@career_plan_id,@subject_code) ps
JOIN app.course c ON c.id = ps.subject_code
WHERE student_id = @student_id AND career_plan_id = @career_plan_id
AND app.validate_course_dates(c.term_id,@term_id,c.year,@year) = 0) 
THEN 1 ELSE 0 END;
IF @is_valid = 0
BEGIN 
	;THROW 50010, 'This course cannot happen before precursor subjects courses dates (coursed status maybe can).', 1;
END;

IF @course_id IS NOT NULL
BEGIN
	-- Check course
	SELECT TOP 1 @existing_course_status = status_id FROM app.course WHERE id = @course_id
	AND student_id = @student_id AND career_plan_id = @career_plan_id AND subject_code = @subject_code
	IF @existing_course_status = 0
	BEGIN 
		SET @error_message = CONCAT('Invalid course with ID = ', CAST(@course_id AS NVARCHAR),
		'. It does not exist or has incorrect information.');
		;THROW 50005, @error_message, 1;
	END;

	IF @status_id IN (@approved_status_id, @coursing_status_id)
	BEGIN
		-- Search availability
		SET @is_valid = (SELECT 1
							  FROM app.correlative 
							  WHERE subject_code = @subject_code
							  AND subject_career_plan_id = @career_plan_id
							  HAVING COUNT(*) = (SELECT qty FROM (SELECT COUNT(*) as qty FROM app.course 
												WHERE student_id = @student_id
												AND career_plan_id = @career_plan_id
												AND status_id = @approved_status_id
												AND subject_code IN (	SELECT correlative_code
																		FROM app.correlative 
																		WHERE subject_code = @subject_code
																		AND subject_career_plan_id = @career_plan_id))alias) )
		IF @is_valid = 0
		BEGIN
			SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' is not available.');
			;THROW 50007, @error_message, 1;
		END

		
		-- Check no two approved or in-progress courses happen simultaneously (maybe don't needed)
		SELECT @is_valid = CASE WHEN NOT EXISTS(
			SELECT 1 FROM app.course 
			WHERE @student_id = student_id AND @career_plan_id = career_plan_id 
			AND @subject_code = subject_code AND status_id = @status_id
			) THEN 1 ELSE 0 END;
		IF @is_valid = 0
		BEGIN 
			;THROW 50006, 'There can be only one approved or in-progress subject simultaneously.', 1;
		END;
	END
	ELSE
	BEGIN
	
		-- Check no approved or in-progress exist before this course
		SELECT @is_valid = CASE WHEN NOT EXISTS(
			SELECT 1 FROM app.course 
			WHERE @student_id = student_id AND @career_plan_id = career_plan_id 
			AND @subject_code = subject_code AND status_id IN (@approved_status_id, @coursing_status_id)
			AND app.validate_course_dates(term_id,@term_id,year,@year) = 0 
			) THEN 1 ELSE 0 END;
		IF @is_valid = 0
		BEGIN 
			;THROW 50006, 'There can be only one approved or in-progress subject simultaneously.', 1;
		END;

	END

	-- Check exams
	EXEC app.validate_exams @exams_table_param; 
	
	-- Update exams
	DELETE FROM app.course_exam WHERE course_id = @course_id;

	SELECT *
	INTO   #temp_exams
	FROM   @exams_table_param;
	
	WHILE (SELECT COUNT(1) FROM #temp_exams) > 0
	BEGIN
	DECLARE @var_exam_id TINYINT;
	SELECT TOP 1 @var_exam_id = exam_id FROM #temp_exams;

	INSERT INTO app.course_exam SELECT TOP 1 * FROM #temp_exams

	DELETE FROM #temp_exams WHERE exam_course_id = @course_id AND exam_id = @var_exam_id
	END

	-- Update course
	IF(@existing_course_status = @approved_status_id AND @status_id <> @approved_status_id)
	BEGIN
		-- Use function to remove dependant subjects courses
		DELETE FROM app.course 
		WHERE student_id = @student_id AND career_plan_id = @career_plan_id
		AND subject_code IN (
							  SELECT * FROM 
							  app.get_dependant_subjects(@student_id,@career_plan_id,@subject_code))
	END

	-- Update logic
	UPDATE app.course
	SET term_id = @term_id, year = @year, final_grade = @final_grade, status_id = @status_id
	WHERE id = @course_id;
END
ELSE
BEGIN
-- course viene NULO:
	SELECT 1
END


COMMIT TRAN;

END TRY
BEGIN CATCH
     ROLLBACK TRAN;
     DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
     DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
     DECLARE @ErrorState INT = ERROR_STATE();
     RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
END CATCH

END;