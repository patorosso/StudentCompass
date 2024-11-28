USE StudentCompass

GO

CREATE OR ALTER PROCEDURE GetProgressOverview 
@StudentId SMALLINT,
@CareerPlanId TINYINT
AS
BEGIN

DECLARE @ApprovedStatusId TINYINT = 1;
DECLARE @AttendingStatusId TINYINT = 3;
DECLARE @AvailableStatusId TINYINT = 5;
DECLARE @NotAvailableStatusId TINYINT = 6;
DECLARE @TransversalCareerPlanId TINYINT = 0;

WITH 
approved_or_in_progress_subjects AS ( -- get approved or in progress subjects of course table using SP params
		SELECT SubjectCode, CareerPlanId, StatusId, FinalGrade, Id 
		FROM Course c
		WHERE StudentId = @StudentId AND StatusId IN (@ApprovedStatusId, @AttendingStatusId)
		AND CareerPlanId IN (@CareerPlanId, @TransversalCareerPlanId)
), 
career_subjects AS ( -- get all subjects info from the career plan parameter and transversal ones
	SELECT * 
	FROM Subject 
	WHERE CareerPlanId IN (@CareerPlanId, @TransversalCareerPlanId)
),
non_available_subjects AS ( -- get distinct non available subjects
	SELECT SubjectCode as NotAvailable,
	ROW_NUMBER() OVER (PARTITION BY SubjectCode ORDER BY SubjectCode) as RowNumber
	FROM Correlative 
	WHERE SubjectCareerPlanId IN (@TransversalCareerPlanId, @CareerPlanId)
	AND CorrelativeCode 
	NOT IN ( SELECT SubjectCode FROM approved_or_in_progress_subjects WHERE StatusId = @ApprovedStatusId )
)

-- query subjects
SELECT s.Code, s.Description, s.WeeklyHours, s.YearLevel, s.IsOptional, s.CareerPlanId,
s.IsElective, s.IsAnnual, course_info.FinalGrade, course_info.Id as CourseId,
CASE WHEN (j.RowNumber = 1 OR IsElective= 1) THEN @NotAvailableStatusId
	 WHEN (StatusId IN (@ApprovedStatusId, @AttendingStatusId)) THEN StatusId
	 ELSE @AvailableStatusId
	 END AS [Status]
FROM approved_or_in_progress_subjects course_info
RIGHT JOIN career_subjects s ON course_info.SubjectCode = s.Code -- all subjects with their info
LEFT JOIN non_available_subjects j ON j.RowNumber = 1 AND j.NotAvailable = s.Code -- add available logic

END

GO

--EXEC GetProgressOverview 1, 1