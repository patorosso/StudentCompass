USE studentcompass

GO

IF OBJECT_ID('app.get_precursor_subjects ', 'FN') IS NOT NULL DROP FUNCTION app.get_precursor_subjects;

GO

CREATE OR ALTER FUNCTION app.get_precursor_subjects
(
    @career_plan_id TINYINT,
    @subject_code SMALLINT
)
RETURNS @return_table TABLE
(
    subject_code SMALLINT
)
AS
BEGIN

    -- Temporary table to hold the recursive results
    DECLARE @temp_table TABLE
    (
        correlative_code SMALLINT
    );

    -- Populate the temporary table using a recursive CTE
    WITH recursive_correlatives AS 
    (
        -- Anchor member: get approved subjects dependant on initial subject
        SELECT cor.correlative_code
        FROM app.correlative cor
        WHERE cor.subject_code = @subject_code
        AND cor.subject_career_plan_id = @career_plan_id
        
        UNION ALL
        
        -- Recursive member: if the approved subject is found, it becomes the new initial subject
        SELECT c.correlative_code
        FROM app.correlative c
        INNER JOIN recursive_correlatives rc ON c.subject_code = rc.correlative_code
        WHERE c.subject_career_plan_id = @career_plan_id
    )
    INSERT INTO @temp_table
    SELECT DISTINCT * FROM recursive_correlatives;

    -- Transfer the results from the temporary table to the return table
    INSERT INTO @return_table
    SELECT * FROM @temp_table;

    RETURN;
END;







