-- insert a student

USE studentcompass

--INSERT INTO app.student (username, pass, is_active) VALUES ('admin', 'admin', 1);

---- insert some rows into course, with student id 1

INSERT INTO app.course 
(student_id, subject_code, career_plan_id, term_id, status_id, year, final_grade) VALUES
--(1, 0901, 0, 2, 1, 2019, 10),
--(1, 0902, 0, 3, 1, 2020, 9),
--(1, 0903, 0, 3, 1, 2023, 10),
--(1, 0904, 0, 1, 1, 2023, 10),
--(1, 0911, 0, 2, 1, 2018, 8),
--(1, 0912, 0, 1, 1, 2019, 8),
(1, 3628, 1, 2, 1, 2018, 7);

select * from app.correlative where subject_career_plan_id IN (0,1)

use studentCompass
select * from app.course_status

-----------------

--EXEC app.academic_student_info 1,1

SELECT *
FROM app.course c
 where student_id = 1
--insert into app.course(student_id,subject_code,career_plan_id,term_id,status_id,year,final_grade) values (1,901,0,1,1,2022,10)

--insert into app.course_exam(exam_id, course_id, grade) values (2, 310003, 10)

DELETE FROM app.course where student_id = 1 and subject_code > 3000

--delete from app.course

--DECLARE @students INT = 30000

--WHILE @students > 0
--BEGIN

--INSERT INTO app.student VALUES ('a','a',1)

--SET @students = @students - 1

--END

-- recover
-- INSERT INTO app.student VALUES ('a','a',1)
insert into app.course(student_id,subject_code,career_plan_id,term_id,status_id,year,final_grade)
values (1,911,0,NULL,2,NULL,NULL)

--insert into app.course_exam(exam_id, course_id, grade) values (2, 2, 10)
--insert into app.enrolled values (1,1,'2022-03-03')

EXEC app.get_career_correlatives 1

-- check if i have all the correlatives done... maybe write this in a SP, think about the DB exercise to optimize:

DECLARE @student_id INT = 1;
DECLARE @career_plan_id SMALLINT = 1;
DECLARE @approved_status_id TINYINT = 1;
DECLARE @subject_code SMALLINT = 3634;


WITH correlatives_gotten AS (
		SELECT COUNT(*) as qty FROM app.course 
		WHERE student_id = @student_id
		AND career_plan_id = @career_plan_id
		AND status_id = @approved_status_id
		AND subject_code IN (	SELECT correlative_code
								FROM app.correlative 
								WHERE subject_code = @subject_code
								AND subject_career_plan_id = @career_plan_id)
		)
		SELECT 1
		FROM app.correlative 
		WHERE subject_code = @subject_code
		AND subject_career_plan_id = @career_plan_id
		HAVING COUNT(*) = (SELECT qty FROM correlatives_gotten)