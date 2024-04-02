USE studentcompass

GO

CREATE OR ALTER PROCEDURE app.get_career_correlatives
@career_plan_id TINYINT
AS
BEGIN

DECLARE @transversal_career_plan_id TINYINT = 0;
DECLARE @error_message NVARCHAR(70);
DECLARE @career_plan_id_exists BIT;
	
	-- Check career
	SELECT @career_plan_id_exists = CASE WHEN EXISTS(
		SELECT 1 FROM app.career_plan WHERE id = @career_plan_id
		) THEN 1 ELSE 0 END;
	IF @career_plan_id_exists = 0
	BEGIN 
		SET @error_message = CONCAT('Career plan with id ', CAST(@career_plan_id AS NVARCHAR), ' does not exist.');
		;THROW 50001, @error_message, 1;
    END

	-- If all ok, show result
	SELECT subject_code, correlative_code 
	FROM app.correlative
	WHERE subject_career_plan_id IN (@career_plan_id, @transversal_career_plan_id)

END

GO