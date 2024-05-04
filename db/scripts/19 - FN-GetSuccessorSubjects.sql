USE studentcompass

GO

IF OBJECT_ID('app.get_successor_subjects ', 'FN') IS NOT NULL DROP FUNCTION app.get_successor_subjects;

GO

CREATE OR ALTER FUNCTION app.get_successor_subjects
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
        subject_code SMALLINT
    );

    -- Populate the temporary table using a recursive CTE
    WITH recursive_correlatives AS 
    (
        -- Anchor member: get approved subjects dependant on initial subject
        SELECT cor.subject_code
        FROM app.correlative cor
        WHERE cor.correlative_code = @subject_code
        AND cor.subject_career_plan_id = @career_plan_id
        
        UNION ALL
        
        -- Recursive member: if the approved subject is found, it becomes the new initial subject
        SELECT c.subject_code
        FROM app.correlative c
        INNER JOIN recursive_correlatives rc ON c.correlative_code = rc.subject_code
        WHERE c.subject_career_plan_id = @career_plan_id
    )
    INSERT INTO @temp_table
    SELECT * FROM recursive_correlatives;

    -- Transfer the results from the temporary table to the return table
    INSERT INTO @return_table
    SELECT * FROM @temp_table;

    RETURN;
END;