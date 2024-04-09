USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.get_courses
@student_id SMALLINT,
@career_plan_id TINYINT
AS
BEGIN

DECLARE @transversal_career_plan_id TINYINT = 0;

-- courses
SELECT *
FROM app.course
WHERE student_id = @student_id
AND career_plan_id IN (@career_plan_id,@transversal_career_plan_id)

-- exams
SELECT ex.exam_id, ex.grade, ex.course_id
FROM app.course_exam ex
LEFT JOIN app.course c ON c.id = ex.course_id
WHERE c.student_id = @student_id AND c.career_plan_id IN (@career_plan_id, @transversal_career_plan_id)

END

GO