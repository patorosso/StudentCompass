USE studentcompass

GO

CREATE OR ALTER FUNCTION app.get_courses (
    @student_id SMALLINT,
    @career_plan_id TINYINT
)
RETURNS TABLE
AS
RETURN
(
    SELECT *
	FROM app.course
	WHERE student_id = @student_id
	AND career_plan_id = @career_plan_id
);

GO