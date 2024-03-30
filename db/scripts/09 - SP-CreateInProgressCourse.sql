USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.create_in_progress_course
@student_id SMALLINT,
@career_plan_id TINYINT,
@subject_code SMALLINT
AS
BEGIN

DECLARE @transversal_career_plan_id TINYINT = 0;
DECLARE @approved_status_id TINYINT = 1;
DECLARE @in_progress_status_id TINYINT = 2;
DECLARE @failed_status_id TINYINT = 3;
DECLARE @coursed_status_id TINYINT = 4;
DECLARE @subject_exists BIT;
DECLARE @student_exists BIT;
DECLARE @is_available BIT;
DECLARE @ok_previous_courses BIT;
DECLARE @error_message NVARCHAR(150);
	
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

	-- Check availability
	WITH approved_subjects AS ( -- get approved or in progress subjects of course table using SP params
			SELECT subject_code, career_plan_id, status_id, final_grade, id 
			FROM app.course c
			WHERE student_id = @student_id AND status_id = @approved_status_id
			AND career_plan_id = @career_plan_id)
	SELECT @is_available = CASE WHEN NOT EXISTS(
		SELECT subject_code as no_disponible,
		ROW_NUMBER() OVER (PARTITION BY subject_code ORDER BY subject_code) as rn
		FROM app.correlative 
		WHERE subject_career_plan_id = @career_plan_id AND subject_code = @subject_code
		AND correlative_code NOT IN ( SELECT subject_code FROM approved_subjects )
		) THEN 1 ELSE 0 END;
	IF @is_available = 0
	BEGIN 
		SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' is currently not available for the student.');
		;THROW 50003, @error_message, 1;
    END

	-- Check if previous courses taken only have status "Cursada" or "Desaprobada"
	SELECT @ok_previous_courses = CASE WHEN NOT EXISTS(
		SELECT *
		FROM app.course
		WHERE student_id = @student_id AND status_id NOT IN(@failed_status_id, @coursed_status_id)
		AND career_plan_id = @career_plan_id AND subject_code = @subject_code
		) THEN 1 ELSE 0 END;
	IF @ok_previous_courses = 0
	BEGIN 
		SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' is already approved or in progress.');
		;THROW 50004, @error_message, 1;
    END
	
	-- If all ok, insert
	INSERT INTO app.course(student_id, subject_code, career_plan_id, status_id)
	VALUES (@student_id, @subject_code, @career_plan_id, @in_progress_status_id);

	SELECT CAST(SCOPE_IDENTITY() AS INT) as course_id, @subject_code as subject_code
END

GO


--DECLARE @my_var INT;
----select * from app.course where student_id = 1
--EXEC app.create_in_progress_course 1,1,3626

--SELECT @my_var
----student, career , subject
----select * from app.enrolled

--select * from app.course

