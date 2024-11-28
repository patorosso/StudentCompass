USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.seed_course_randomly @qty INT AS
BEGIN
    DECLARE @qty_subject_per_student INT
    DECLARE @career_plan INT
    DECLARE @subject_code INT

    SELECT code, career_plan_id, ROW_NUMBER() OVER  (PARTITION BY career_plan_id ORDER BY code) as rn
    INTO #code_career_plan
    FROM app.subject

    WHILE @qty > 0
    BEGIN
        SET @career_plan = CAST((RAND() * 8) + 1 AS INT) -- plans between 1-8
        SET @qty_subject_per_student = 10

        WHILE @qty_subject_per_student > 0
        BEGIN
            SELECT @subject_code = code
            FROM #code_career_plan
            WHERE career_plan_id = @career_plan
            AND rn = CAST((RAND() * 45) + 1 AS INT) -- subject avg total per plan is 45

            INSERT INTO app.course(student_id, subject_code, career_plan_id, term_id, status_id, year, final_grade)
            VALUES (@qty, @subject_code, @career_plan, 1, ROUND(RAND() * 2, 0), 2022, 10);

            SET @qty_subject_per_student = @qty_subject_per_student - 1
        END -- end while subjs

        SET @qty = @qty - 1
    END -- end while studs

    DROP TABLE #code_career_plan
END -- end procedure

GO

--EXEC app.seed_course_randomly 31000