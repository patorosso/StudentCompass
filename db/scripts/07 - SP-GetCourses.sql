USE StudentCompass

GO

CREATE OR ALTER PROCEDURE GetCoursesWithExams
@UserId SMALLINT,
@CareerPlanId TINYINT,
@SubjectCode SMALLINT
AS
BEGIN

DECLARE @TransversalCareerPlanId TINYINT = 0;

-- Courses with Exams
SELECT C.Id, C.SubjectCode, C.CareerPlanId, C.TermId, C.StatusId, C.Year, C.FinalGrade,
Ex.ExamId, Ex.Grade, Ex.TakenOn
FROM CourseExam Ex
LEFT JOIN Course C ON C.Id = Ex.CourseId
WHERE C.UserId = @UserId AND C.CareerPlanId IN (@CareerPlanId, @TransversalCareerPlanId)
ORDER BY Year DESC, TermId DESC

END

GO

--EXEC GetCourses 1,1,1