USE studentcompass

GO

-- Conditional removal of the SP and TVP type

IF OBJECT_ID('app.update_subjects', 'P') IS NOT NULL DROP PROCEDURE app.update_subjects;

IF EXISTS(SELECT * FROM sys.types 
WHERE is_table_type = 1 AND name = 'subjects_to_update_type' AND schema_id = SCHEMA_ID('app'))
BEGIN
    DROP TYPE app.subjects_to_update_type;
END;

-- Table-valued parameter creation

CREATE TYPE app.subjects_to_update_type AS TABLE
(
    subject_code SMALLINT NOT NULL,
	career_plan_id TINYINT NOT NULL,
	status_id TINYINT NOT NULL,
	final_grade TINYINT,
	course_id INT
);

GO

CREATE OR ALTER PROCEDURE app.update_subjects
@student_id SMALLINT,
@student_career_plan_id TINYINT,
@subjects_to_update app.subjects_to_update_type READONLY
AS
BEGIN

DECLARE @subject_code SMALLINT;
DECLARE @career_plan_id TINYINT;
DECLARE @status_id TINYINT;
DECLARE @final_grade TINYINT;
DECLARE @course_id INT;
DECLARE @status_exists BIT;
DECLARE @subject_exists BIT;
DECLARE @student_exists BIT;
DECLARE @valid_grade BIT;
DECLARE @course_exists BIT;
DECLARE @is_status_duplicated BIT;
DECLARE @is_approvable BIT;
DECLARE @existing_course_status TINYINT = 0;
DECLARE @transversal_career_plan_id TINYINT = 0;
DECLARE @approved_status_id TINYINT = 1;
DECLARE @coursing_status_id TINYINT = 2;
DECLARE @available_status_id TINYINT = 5;
DECLARE @error_message VARCHAR(150);

SELECT *
INTO   #subjects_to_update
FROM   @subjects_to_update

BEGIN TRY
BEGIN TRAN

	WHILE (SELECT COUNT(*) FROM #subjects_to_update) > 0
	BEGIN
	
	SELECT TOP 1 
	@subject_code = subject_code, @course_id = course_id, @status_id = status_id,
	@final_grade = final_grade, @career_plan_id = career_plan_id
	FROM #subjects_to_update ORDER BY subject_code -- it's important subjects are ordered

	-- Check subject
	SELECT @subject_exists = CASE WHEN EXISTS(
		SELECT 1 FROM app.subject WHERE code = @subject_code AND career_plan_id = @career_plan_id
		) THEN 1 ELSE 0 END;
	IF @subject_exists = 0
	BEGIN 
		SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' does not exist or does not belong to the provided career plan.');
		;THROW 50001, @error_message, 1;
    END

	-- Check student
	SELECT @student_exists = CASE WHEN EXISTS(
		SELECT 1 FROM app.enrolled WHERE student_id = @student_id 
		AND (career_plan_id = @career_plan_id OR @career_plan_id = @transversal_career_plan_id)
		) THEN 1 ELSE 0 END;
	IF @student_exists = 0
	BEGIN 
		SET @error_message = CONCAT('Student with ID = ', CAST(@student_id AS NVARCHAR), 
		' does not exist or is not enrolled in the provided career plan with ID = ', CAST(@career_plan_id AS NVARCHAR));
		;THROW 50002, @error_message, 1;
    END;

	-- Check status
	SELECT @status_exists = CASE WHEN EXISTS(
		SELECT 1 FROM app.course_status WHERE @status_id = id
		) THEN 1 ELSE 0 END;
	IF @status_exists = 0
	BEGIN 
		SET @error_message = CONCAT('Status with ID = ', CAST(@status_id AS NVARCHAR), ' does not exist.');
		;THROW 50003, @error_message, 1;
    END;

	-- Check grade
	SELECT @valid_grade = CASE WHEN ((@status_id = @approved_status_id AND @final_grade IN (4,5,6,7,8,9,10)) 
	OR (@status_id <> @approved_status_id AND @final_grade IS NULL)
		) THEN 1 ELSE 0 END;
	IF @valid_grade = 0
	BEGIN 
		SET @error_message = 'Final grade must be between 4-10 if the status is approved. Otherwise, null.';
		;THROW 50004, @error_message, 1;
    END;
	
		IF (@course_id IS NOT NULL)
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
	
			IF(@existing_course_status = @approved_status_id AND @status_id <> @approved_status_id)
			BEGIN
				-- Use function to remove dependant subjects courses
				DELETE FROM app.course 
				WHERE student_id = @student_id AND career_plan_id IN (@career_plan_id, @transversal_career_plan_id)
				AND subject_code IN (
									  SELECT * FROM 
									  app.get_subjects_to_remove_courses(@student_id,@career_plan_id,@subject_code))

				IF(@status_id = @available_status_id)
				BEGIN
					DELETE FROM app.course WHERE @course_id = id; --available status is calculable, no need for rows.
				END
				ELSE IF(@status_id = @coursing_status_id)
				BEGIN
					UPDATE app.course 
					SET status_id = @coursing_status_id, final_grade = @final_grade
					WHERE id = @course_id;	
				END
			END
			ELSE
			BEGIN
				UPDATE app.course 
				SET status_id = @status_id, final_grade = @final_grade
				WHERE id = @course_id;
			END
		END
		ELSE
		BEGIN
		-- Search availability
		SET @is_approvable = (SELECT 1
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

			IF(@status_id IN (@approved_status_id, @coursing_status_id))
			BEGIN

				-- Check no two approved or in-progress courses happen simultaneously
				SELECT @is_status_duplicated = CASE WHEN EXISTS(
					SELECT 1 FROM app.course 
					WHERE @student_id = student_id AND @career_plan_id = career_plan_id 
					AND @subject_code = subject_code AND status_id = @status_id
					) THEN 1 ELSE 0 END;
				IF @is_status_duplicated = 1
				BEGIN 
					;THROW 50006, 'There can be only one approved or in-progress subject simultaneously.', 1;
				END;
				
				-- verificar si la materia ESTA DISPONIBLE
				-- si lo está, creo course_id.
				IF (@is_approvable = 1)
				BEGIN
					INSERT INTO app.course(student_id,subject_code,career_plan_id,status_id,final_grade)
					VALUES (@student_id, @subject_code, @career_plan_id, @status_id, @final_grade)
				END
				ELSE
				BEGIN
					SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' is not available.');
					;THROW 50007, @error_message, 1;
				END
			END
			ELSE IF(@status_id = @available_status_id)
			BEGIN
				-- si vino DISPONIBLE y en realidad no lo está, tiro error. si ya estaba disponible no hago nada.
				IF (@is_approvable = 0)
				BEGIN
					SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' is not available.');
					;THROW 50007, @error_message, 1;
				END
			END
		END

	DELETE FROM #subjects_to_update 
	WHERE subject_code = @subject_code AND
	career_plan_id = @career_plan_id
 
	END

	COMMIT TRAN;
	DROP TABLE #subjects_to_update
	EXEC app.academic_student_info @student_id, @student_career_plan_id

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