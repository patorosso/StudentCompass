USE StudentCompass

GO

CREATE OR ALTER FUNCTION GetDependantSubjects
(
    @StudentId SMALLINT,
    @CareerPlanId TINYINT,
    @SubjectCode SMALLINT
)
RETURNS @ReturnTable TABLE
(
    SubjectCode SMALLINT
)
AS
BEGIN
    DECLARE @ApprovedStatusId TINYINT = 1;

    -- Temporary table to hold the recursive results
    DECLARE @TempTable TABLE
    (
        SubjectCode SMALLINT
    );

    -- Populate the temporary table using a recursive CTE
    WITH RecursiveCorrelatives AS 
    (
        -- Anchor member: get approved subjects dependant on initial subject
        SELECT Cor.SubjectCode
        FROM Correlative Cor
        INNER JOIN Course Cou ON Cou.SubjectCode = Cor.SubjectCode 
        AND Cou.CareerPlanId = Cor.SubjectCareerPlanId
        AND Cou.StatusId = @ApprovedStatusId
        WHERE Cor.CorrelativeCode = @SubjectCode
        AND Cor.SubjectCareerPlanId = @CareerPlanId
        AND Cou.StudentId = @StudentId
        
        UNION ALL
        
        -- Recursive member: if the approved subject is found, it becomes the new initial subject
        SELECT c.SubjectCode
        FROM Correlative c
        INNER JOIN RecursiveCorrelatives rc ON c.CorrelativeCode = rc.SubjectCode
        INNER JOIN Course Cou ON Cou.SubjectCode = c.SubjectCode 
        AND Cou.CareerPlanId = c.SubjectCareerPlanId
        AND Cou.StatusId = @ApprovedStatusId
        WHERE c.SubjectCareerPlanId = @CareerPlanId
        AND Cou.StudentId = @StudentId
    )
    INSERT INTO @TempTable
    SELECT * FROM RecursiveCorrelatives;

    -- Transfer the results from the temporary table to the return table
    INSERT INTO @ReturnTable
    SELECT * FROM @TempTable;

    RETURN;
END;


