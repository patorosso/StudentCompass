USE studentcompass

GO

-- Conditional removal of the SP and TVP type

IF OBJECT_ID('app.update_subjects', 'P') IS NOT NULL DROP PROCEDURE app.update_subjects;

IF EXISTS(SELECT * FROM sys.types 
WHERE is_table_type = 1 AND name = 'subjects_to_update_type' AND schema_id = SCHEMA_ID('app'))
BEGIN
    DROP TYPE app.subjects_to_update_type;
END;

-- Table-valued parameter creation

CREATE TYPE app.subjects_to_update_type AS TABLE
(
    code SMALLINT NOT NULL,
	career_plan_id TINYINT NOT NULL,
	status_id TINYINT NOT NULL,
	final_grade TINYINT,
	course_id INT
);

GO

CREATE OR ALTER PROCEDURE app.update_subjects
@student_id SMALLINT,
@subjects_to_update app.subjects_to_update_type READONLY
AS
BEGIN


-- TRANSACTION
 
-- final grade entre 4 y 10 o nulo, CURSANDO y DISPONIBLE no deben tener final grade
-- existencia de code con career plan id
-- status_id tambien valido ( APROBADA, CURSANDO o DISPONIBLE )

-- actualizar algo identico. (implica nada)
-- pasar de APROBADA a -> CURSANDO || DISPONIBLE. (implica eliminar cursadas de las que dependen)
-- pasar de DISPONIBLE || CURSANDO a -> APROBADA. (implica nada)
-- pasar 

-- 

SELECT 1

END

GO