USE test_studentcompass

GO

CREATE OR ALTER PROCEDURE CourseToAttending
@CourseId INT,
@StudentId SMALLINT,
@CareerPlanId TINYINT,
@SubjectCode SMALLINT
AS
BEGIN

DECLARE @AttendingStatusId TINYINT = 2;
DECLARE @SubjectExists BIT;
DECLARE @CareerPlanExists BIT;
DECLARE @StudentExists BIT;

-- Check subject
SELECT @SubjectExists = CASE WHEN EXISTS(
	SELECT 1 FROM Subject WHERE Code = @SubjectCode
	) THEN 1 ELSE 0 END;
-- Check plan
SELECT @CareerPlanExists = CASE WHEN EXISTS(
	SELECT 1 FROM CareerPlan WHERE Id = @CareerPlanId
	) THEN 1 ELSE 0 END;
-- Check student
SELECT @StudentExists = CASE WHEN EXISTS(
	SELECT 1 FROM Student WHERE Id = @StudentId
	) THEN 1 ELSE 0 END;

 -- Proceed only if all entities exist
    IF @SubjectExists = 1 AND @CareerPlanExists = 1 AND @StudentExists = 1
    BEGIN
        -- Validate course
        IF EXISTS
		(SELECT 1 FROM Course
		WHERE StudentId = @StudentId AND 
		SubjectCode = @SubjectCode AND 
		CareerPlanId = @CareerPlanId AND
		Id = @CourseId)
        BEGIN
            -- Update case
            UPDATE Course
            SET StatusId = @AttendingStatusId
            WHERE StudentId = @StudentId AND SubjectCode = @SubjectCode AND CareerPlanId = @CareerPlanId;
        END
        ELSE
        BEGIN
            -- Insert case
            INSERT INTO Course(StudentId, SubjectCode, CareerPlanId, StatusId)
            VALUES (@StudentId, @SubjectCode, @CareerPlanId, @AttendingStatusId);
        END
    END
    ELSE
    BEGIN
        ;THROW 50000, 'The provided student, subject, or career plan does not exist.', 1;
    END


END

GO
