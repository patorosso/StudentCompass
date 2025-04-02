
------------- Types removal -------------

IF EXISTS(SELECT * FROM sys.types 
WHERE is_table_type = 1 AND name = 'exams_table' AND schema_id = SCHEMA_ID('app'))
BEGIN
    DROP TYPE app.exams_table;
END;

-- Table-valued parameter creation

CREATE TYPE app.exams_table AS TABLE
(
	exam_course_id INT,
	exam_id TINYINT,
	taken_on DATE,
	grade TINYINT NOT NULL
);

GO