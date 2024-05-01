USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.validate_availability
@student_id SMALLINT,
@career_plan_id TINYINT,
@subject_code SMALLINT
AS
BEGIN

DECLARE @approved_status_id TINYINT = 1;
DECLARE @is_valid BIT;
DECLARE @error_message VARCHAR(100);

-- Search availability
		SET @is_valid = (SELECT 1
							  FROM app.correlative 
							  WHERE subject_code = @subject_code
							  AND subject_career_plan_id = @career_plan_id
							  HAVING COUNT(*) = (SELECT qty FROM (SELECT COUNT(*) as qty FROM app.course 
												WHERE student_id = @student_id
												AND career_plan_id = @career_plan_id
												AND status_id = @approved_status_id
												AND subject_code IN (	SELECT correlative_code
																		FROM app.correlative 
																		WHERE subject_code = @subject_code
																		AND subject_career_plan_id = @career_plan_id))alias) )
		IF @is_valid = 0
		BEGIN
			SET @error_message = CONCAT('Subject with code ', CAST(@subject_code AS NVARCHAR), ' is not available.');
			DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
			DECLARE @ErrorState INT = ERROR_STATE();
			RAISERROR (@error_message, @ErrorSeverity, @ErrorState);
		END

END