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
DECLARE @is_approvable BIT;
DECLARE @existing_course_status TINYINT = -1;
DECLARE @transversal_career_plan_id TINYINT = 0;
DECLARE @approved_status_id TINYINT = 1;
DECLARE @coursing_status_id TINYINT = 3;
DECLARE @available_status_id TINYINT = 5;
DECLARE @error_message VARCHAR(150);

SELECT *
INTO   #subjects_to_update
FROM   @subjects_to_update

-- ordeno la tabla que me dieron por codigo para ASEGURARME de que no voy a tener problemas con updates que puedan fallar.
-- Ejemplo: viene Fisica 2 y Fisica 1 para pasar a APROBADAS, en ese orden.
-- si trato primero a F2, va a salir un error por no tratar a la anterior primero. No puedo tener en cuenta en la lista de
-- disponibles a los registros estos de updates, porque pueden estar mal. Por ejemplo, quizá nunca aprobé análisis 1...
BEGIN TRY
BEGIN TRAN

	WHILE (SELECT COUNT(*) FROM #subjects_to_update) > 0
	BEGIN
	
	SELECT TOP 1 
	@subject_code = subject_code, @course_id = course_id, @status_id = status_id,
	@final_grade = final_grade, @career_plan_id = career_plan_id
	FROM #subjects_to_update ORDER BY subject_code

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
	SELECT @valid_grade = CASE WHEN ((@status_id = @approved_status_id AND @final_grade IN (4,10)) 
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
		IF @existing_course_status = -1
		BEGIN 
			SET @error_message = CONCAT('Course with ID = ', CAST(@course_id AS NVARCHAR), ' does not exist.');
			;THROW 50005, @error_message, 1;
		END;
	
			IF(@existing_course_status = @approved_status_id AND @status_id <> @approved_status_id)
			BEGIN

				-- eliminar cursadas que dependen

				IF(@status_id = @available_status_id)
				BEGIN
					DELETE FROM app.course WHERE @course_id = id;
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
			-- 3er estado posible es que sea igual estados (tenido en cuenta en el else) -> 
			-- 1. o es todo igual 2. cambia la nota... supongo que no cuesta nada hacer el update
		END
		ELSE
		BEGIN
		-- si course_id es nulo...
		-- BUSCAR ACA DISPONIBILIDAD
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
				-- verificar si la materia ESTA DISPONIBLE
				-- si lo está, creo course_id.
				IF (@is_approvable = 1)
				BEGIN
					INSERT INTO app.course(student_id,subject_code,career_plan_id,status_id,final_grade)
					VALUES (@student_id, @subject_code, @career_plan_id, @status_id, @final_grade)
				END
			END
			ELSE IF(@status_id = @available_status_id)
			BEGIN
				-- si vino DISPONIBLE y en realidad no lo está, tiro error. si ya estaba disponible no hago nada.
				IF (@is_approvable = 0)
				BEGIN
					SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' is not available.');
					;THROW 50001, @error_message, 1;
				END
			END
		END

	DELETE FROM #subjects_to_update 
	WHERE subject_code = @subject_code AND
	career_plan_id = @career_plan_id
 
	END

	COMMIT TRAN;
	DROP TABLE #subjects_to_update

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