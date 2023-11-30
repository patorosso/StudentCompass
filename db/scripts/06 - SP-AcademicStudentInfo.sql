USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.academic_student_info 
@student_id SMALLINT,
@career_plan_id TINYINT
AS
BEGIN

DECLARE @approved_status_id TINYINT = 1
DECLARE @transversal_career_plan_id TINYINT = 0

SELECT s.code, s.description, s.weekly_hours, s.year_level, s.is_optional,
s.is_elective, s.is_annual, course_info.final_grade, course_info.status_id,
CASE WHEN (j.rn = 1 OR is_elective = 1 OR status_id = 1) THEN 0 ELSE 1 END AS is_available
FROM(	
		-- get approved subjects
		SELECT c.subject_code, c.career_plan_id, c.status_id, c.final_grade
		FROM app.course c
		WHERE student_id = @student_id
		AND status_id = @approved_status_id
		AND career_plan_id IN (@transversal_career_plan_id, @career_plan_id)
	)	course_info 

-- all subjects with their info
RIGHT JOIN app.subject s 
ON course_info.subject_code = s.code 
AND course_info.career_plan_id = s.career_plan_id

-- correlative logic
LEFT JOIN (
			-- get non available subjects
			SELECT subject_code as no_disponible, 
			ROW_NUMBER() OVER (PARTITION BY subject_code ORDER BY subject_code) as rn
			FROM app.correlative
			WHERE subject_career_plan_id IN (@transversal_career_plan_id, @career_plan_id)
			AND correlative_code NOT IN ( 
								-- get approved subjects (again... optimize?)
								SELECT subject_code
								FROM app.course
								WHERE student_id = @student_id
								AND career_plan_id IN (@transversal_career_plan_id,@career_plan_id) 
								AND status_id = @approved_status_id ) 

			) j ON j.no_disponible = s.code AND j.rn = 1 

WHERE s.career_plan_id = @career_plan_id -- ¡¡ buscar filtrar antes, chequear RIGHT JOIN !!
OR s.career_plan_id = @transversal_career_plan_id

END

GO



EXEC app.academic_student_info 1,1
