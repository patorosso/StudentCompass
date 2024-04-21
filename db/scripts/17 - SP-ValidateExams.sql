use studentcompass

GO

CREATE OR ALTER PROCEDURE app.validate_exams 
@exams_table app.exams_table READONLY
AS
BEGIN

DECLARE @error BIT;
DECLARE @error_message VARCHAR(100);
DECLARE @first_exam_id TINYINT = 1;
DECLARE @second_exam_id TINYINT = 2;
DECLARE @integrator_exam_id TINYINT = 3;
DECLARE @assignment_id TINYINT = 4;
DECLARE @first_rec_id TINYINT = 5;
DECLARE @second_rec_id TINYINT = 6;
DECLARE @integrator_rec_id TINYINT = 7;
DECLARE @final_exam_id TINYINT = 8;
BEGIN TRY

-- Check valid exam_id
SELECT @error = CASE WHEN EXISTS(
	SELECT 1 FROM @exams_table WHERE exam_id NOT IN (1,2,3,4,5,6,7,8)
	) THEN 1 ELSE 0 END;
IF @error = 1
	BEGIN 
	SET @error_message = 'The exam table has one or more invalid exam_id.'
	;THROW 50001, @error_message, 1;
END;

--Check all exams are distinct, except assigments
SELECT @error = CASE WHEN (
	(SELECT COUNT(1) FROM @exams_table WHERE exam_id <> @assignment_id)
	<>
	(SELECT COUNT(DISTINCT exam_id) FROM @exams_table WHERE exam_id <> @assignment_id))
	THEN 1 ELSE 0 END;
IF @error = 1
	BEGIN 
	SET @error_message = 'There cannot be repeated exam ids, except for assignments.'
	;THROW 50002, @error_message, 1;
END;

--Check all grades
SELECT @error = CASE WHEN EXISTS (
	SELECT 1 FROM @exams_table WHERE grade > 10 OR grade < 1)
	THEN 1 ELSE 0 END;
IF @error = 1
	BEGIN 
	SET @error_message = 'Grades must be in the range of 1-10.'
	;THROW 50003, @error_message, 1;
END;

--Check second exam
SELECT @error = CASE WHEN EXISTS (
	SELECT 1 FROM @exams_table WHERE exam_id = @second_exam_id
	AND NOT EXISTS (SELECT 1 FROM @exams_table WHERE exam_id = @first_exam_id)  
	)
	THEN 1 ELSE 0 END;

--Check first rec exam
SELECT @error = CASE WHEN EXISTS (
	SELECT 1 FROM @exams_table WHERE exam_id = @first_rec_id
	AND NOT EXISTS (SELECT 1 FROM @exams_table WHERE exam_id = @first_exam_id AND grade < 7)  
	)
	THEN 1 ELSE 0 END;

--Check second rec exam
SELECT @error = CASE WHEN EXISTS (
	SELECT 1 FROM @exams_table WHERE exam_id = @second_rec_id
	AND NOT EXISTS (SELECT 1 FROM @exams_table WHERE exam_id = @second_exam_id AND grade < 7)  
	)
	THEN 1 ELSE 0 END;

--Check integrator exam
SELECT @error = CASE WHEN EXISTS (
	SELECT 1 FROM @exams_table WHERE exam_id = @integrator_exam_id
	AND EXISTS (SELECT 1 FROM @exams_table WHERE exam_id = @first_exam_id OR exam_id = @second_exam_id)
	)
	THEN 1 ELSE 0 END;

--Check rec integrator exam (more freedom in this one)
SELECT @error = CASE WHEN EXISTS (
	SELECT 1 FROM @exams_table WHERE exam_id = @integrator_rec_id
	AND NOT EXISTS (SELECT 1 FROM @exams_table WHERE exam_id IN (@first_exam_id, @second_exam_id,
	@integrator_exam_id))
	)
	THEN 1 ELSE 0 END;

--Check final
SELECT @error = CASE WHEN EXISTS (
	SELECT 1 FROM @exams_table WHERE exam_id = @final_exam_id
	AND EXISTS ( 
	(SELECT 1 WHERE EXISTS
	--Two exams case:
	(SELECT 1 WHERE EXISTS (
		--First exams coursed:
		SELECT 1 FROM @exams_table WHERE exam_id IN (@first_exam_id, @first_rec_id) AND grade < 7 AND grade > 4) 
		AND EXISTS (
		--Second exams coursed:
		SELECT 1 FROM @exams_table WHERE exam_id IN (@first_exam_id, @first_rec_id) AND grade < 7 AND grade > 4) 
	) 
	OR EXISTS 
	--Integrators case:
	(SELECT 1 WHERE EXISTS (
		SELECT 1 FROM @exams_table WHERE exam_id IN (@integrator_exam_id, @integrator_rec_id) AND grade < 7 AND grade > 4)
	)
)))
THEN 1 ELSE 0 END;

END TRY
BEGIN CATCH
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR (@error_message, @ErrorSeverity, @ErrorState);


END CATCH

END


-- para q haya un seg parcial debe haber un primero
-- lo mismo para recuperatorios... ( si es del prim, que este exista y para el seg lo mismo),

-- final tiene que haber 1 parcial integrador con menos de 7 o 

