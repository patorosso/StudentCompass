USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.subject_to_in_progress
@course_id INT,
@student_id SMALLINT,
@career_plan_id TINYINT,
@subject_code SMALLINT
AS
BEGIN

DECLARE @in_progress_status_id TINYINT = 2;
DECLARE @subject_exists BIT;
DECLARE @career_plan_exists BIT;
DECLARE @student_exists BIT;

-- Check subject
SELECT @subject_exists = CASE WHEN EXISTS(
	SELECT 1 FROM app.subject WHERE code = @subject_code
	) THEN 1 ELSE 0 END;
-- Check plan
SELECT @career_plan_exists = CASE WHEN EXISTS(
	SELECT 1 FROM app.career_plan WHERE id = @career_plan_id
	) THEN 1 ELSE 0 END;
-- Check student
SELECT @student_exists = CASE WHEN EXISTS(
	SELECT 1 FROM app.student WHERE id = @student_id
	) THEN 1 ELSE 0 END;

 -- Proceed only if all entities exist
    IF @subject_exists = 1 AND @career_plan_exists = 1 AND @student_exists = 1
    BEGIN
        -- Validate course
        IF EXISTS
		(SELECT 1 FROM app.course 
		WHERE student_id = @student_id AND 
		subject_code = @subject_code AND 
		career_plan_id = @career_plan_id AND
		id = @course_id)
        BEGIN
            -- Update case
            UPDATE app.course
            SET status_id = @in_progress_status_id
            WHERE student_id = @student_id AND subject_code = @subject_code AND career_plan_id = @career_plan_id;
        END
        ELSE
        BEGIN
            -- Insert case
            INSERT INTO app.course(student_id, subject_code, career_plan_id, status_id)
            VALUES (@student_id, @subject_code, @career_plan_id, @in_progress_status_id);
        END
    END
    ELSE
    BEGIN
        ;THROW 50000, 'The provided student, subject, or career plan does not exist.', 1;
    END



END

GO
