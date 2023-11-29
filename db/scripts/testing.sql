-- insert a student

USE studentcompass

INSERT INTO app.student (username, pass, is_active) VALUES ('admin', 'admin', 1);

-- insert some rows into course, with student id 1

INSERT INTO app.course 
(student_id, subject_code, career_plan_id, term_id, status_id, year, final_grade) VALUES
(1, 0911, 0, 1, 1, 2021, 9),
(1, 3621, 1, 1, 1, 2022, 8),
(1, 3622, 1, 2, 1, 2022, 9),
(1, 3623, 1, 3, 1, 2022, 4),
(1, 3624, 1, 1, 1, 2023, 5),
(1, 3625, 1, 2, 1, 2023, 10),
(1, 3626, 1, 3, 1, 2023, 9);

-----------------

EXEC app.student_subjects 1,1