-- insert a student

USE studentcompass

--INSERT INTO app.student (username, pass, is_active) VALUES ('admin', 'admin', 1);

---- insert some rows into course, with student id 1

--INSERT INTO app.course 
--(student_id, subject_code, career_plan_id, term_id, status_id, year, final_grade) VALUES
--(1, 0911, 0, 1, 1, 2021, 9),
--(1, 3621, 1, 1, 1, 2022, 8),
--(1, 3622, 1, 2, 1, 2022, 9),
--(1, 3623, 1, 3, 1, 2022, 4),
--(1, 3624, 1, 1, 1, 2023, 5),
--(1, 3625, 1, 2, 1, 2023, 10),
--(1, 3626, 1, 3, 1, 2023, 9);

-----------------

--EXEC app.academic_student_info 1,1

SELECT *
FROM app.course c
 where student_id = 1
--insert into app.course(student_id,subject_code,career_plan_id,term_id,status_id,year,final_grade) values (1,901,0,1,1,2022,10)

--insert into app.course_exam(exam_id, course_id, grade) values (2, 310003, 10)

SELECT * FROM app.course_exam

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
