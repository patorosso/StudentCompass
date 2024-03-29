USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.academic_student_info 
@student_id SMALLINT,
@career_plan_id TINYINT
AS
BEGIN

DECLARE @approved_status_id TINYINT = 1;
DECLARE @in_progress_status_id TINYINT = 2;
DECLARE @available_status_id TINYINT = 5;
DECLARE @not_available_status_id TINYINT = 6;
DECLARE @transversal_career_plan_id TINYINT = 0;

WITH 
approved_or_in_progress_subjects AS ( -- get approved or in progress subjects of course table using SP params
		SELECT subject_code, career_plan_id, status_id, final_grade, id 
		FROM app.course c
		WHERE student_id = @student_id AND status_id IN (@approved_status_id, @in_progress_status_id)
		AND career_plan_id IN (@career_plan_id, @transversal_career_plan_id)
), 
career_subjects AS ( -- get all subjects info from the career plan parameter and transversal ones
	SELECT * 
	FROM app.subject 
	WHERE career_plan_id IN (@career_plan_id, @transversal_career_plan_id)
),
non_available_subjects AS ( -- get distinct non available subjects
	SELECT subject_code as no_disponible,
	ROW_NUMBER() OVER (PARTITION BY subject_code ORDER BY subject_code) as rn
	FROM app.correlative 
	WHERE subject_career_plan_id IN (@transversal_career_plan_id, @career_plan_id)
	AND correlative_code NOT IN ( SELECT subject_code FROM approved_or_in_progress_subjects )
)

-- first query: subjects list
SELECT s.code, s.description, s.weekly_hours, s.year_level, s.is_optional,
s.is_elective, s.is_annual, course_info.final_grade, course_info.id as course_id,
CASE WHEN (j.rn = 1 OR is_elective = 1) THEN @not_available_status_id
	 WHEN (status_id IN (@approved_status_id, @in_progress_status_id)) THEN status_id
	 ELSE @available_status_id
	 END AS [status]
FROM approved_or_in_progress_subjects course_info
RIGHT JOIN career_subjects s ON course_info.subject_code = s.code -- all subjects with their info
LEFT JOIN non_available_subjects j ON j.rn = 1 AND j.no_disponible = s.code -- add available logic

-- second query: previous subjects grades
SELECT ex.exam_id, ex.grade, ex.course_id
FROM app.course_exam ex
LEFT JOIN app.course c ON c.id = ex.course_id
WHERE c.student_id = @student_id AND c.career_plan_id IN (@career_plan_id, @transversal_career_plan_id)

END

GO

--set statistics time on
--EXEC app.academic_student_info 1,1


--CREATE NONCLUSTERED INDEX subject_idx ON app.subject (career_plan_id) INCLUDE (description, weekly_hours, year_level, is_optional, is_elective, is_annual)
--CREATE NONCLUSTERED INDEX correlative_idx ON app.correlative (subject_code,subject_career_plan_id, correlative_code) 
--CREATE NONCLUSTERED INDEX course_idx ON app.course (student_id, career_plan_id, status_id) INCLUDE (subject_code, final_grade)

--DROP INDEX subject_idx ON app.subject
--DROP INDEX correlative_idx ON app.correlative
--DROP INDEX course_idx ON app.course

--SELECT * FROM app.correlative correlative
--FULL OUTER JOIN app.course course ON 
--course.career_plan_id = correlative.subject_career_plan_id
----AND course.subject_code = correlative.subject_code
--WHERE course.student_id = 1 AND course.career_plan_id IN (0,1)

--SELECT correlative.subject_code, NULL AS final_grade, NULL AS status_id
--FROM app.correlative correlative
--WHERE correlative.subject_career_plan_id IN (0,1)

--UNION

--SELECT course.subject_code, course.final_grade, course.status_id
--FROM app.course course
--WHERE course.student_id = 1 AND course.career_plan_id IN (0,1)
--ORDER BY subject_code

--select * from app.course where career_plan_id = 0 and student_id = 1

--select * from app.correlative where subject_career_plan_id IN (0,1) 