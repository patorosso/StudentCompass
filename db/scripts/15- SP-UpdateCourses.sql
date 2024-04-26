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
@exams_table app.exams_table READONLY
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

		-- Check dependant subjects dates (poor perfomance)
		SELECT @is_valid = CASE WHEN NOT EXISTS (
			SELECT 1 FROM app.get_dependant_subjects(@student_id,@career_plan_id,@subject_code) ds
			JOIN app.course c ON c.id = ds.subject_code
			WHERE student_id = @student_id AND career_plan_id = @career_plan_id
			AND app.validate_course_dates(@term_id,c.term_id,@year,c.year) = 0) 
			THEN 1 ELSE 0 END;
			IF @is_valid = 0
			BEGIN 
				;THROW 50006, 'This course cannot happen after dependant subjects courses dates (coursed status maybe can).', 1;
			END;

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

	
END
ELSE
BEGIN
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

END

GO


-- course:

-- revisar fechas:

-- segundo, buscar las que dependen de esa materia (si las fechas son mayores a sus
-- inmediatas correlativas anteriores y menores a sus inmediatas correlativas posteriores.

-- ojo, si viene un desaprobada no puede haber un APROBADA que esté antes

-- ahora se verifican los examenes. 
-- CHECK ACA QUE LOS EXAM_COURSE_ID existan y llamar al proc para verificarlos mejor

-- update  -> implica que si estaba APROBADA debo eliminar los cursos que la necesitaban

-- ... .mas cosas quizas

-- course viene NULO:

--- ........



-- tipos de examenes: primer parcial, segundo parcial, recuperatorio primer/segundo, recuperatorio integrador,
-- tp, presentación, 