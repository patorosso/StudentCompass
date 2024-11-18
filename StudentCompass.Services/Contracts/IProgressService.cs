using StudentCompass.Data.Dtos;
using StudentCompass.Data.Entities;

namespace StudentCompass.Services.Contracts
{
    public interface IProgressService
    {
        Task<List<GetProgressOverviewDto>> GetProgressOverview(short studentId, byte careerPlanId);
        Task<List<GetProgressOverviewDto>> UpdateSubjects(List<SubjectToUpdateDto> subjectsToUpdate, short studentId, byte careerPlanId);
        Task<List<Course>> GetCoursesByCareerAndStudent(byte careerPlanId, short studentId);
        Task<List<Subject>> GetSubjectsByCareer(byte careerPlanId);
        Task<Dictionary<short, List<short>>> GetCorrelativesByCareer(byte careerPlanId);
        Task<List<SubjectDto>> CreateAttendingCourse(List<Subject> subjects, short studentId);
        Task CourseToAttending(int? courseId);
        Task<(short, byte)?> GetEnrollByStudentAndCareer(short studentId, byte careerPlanId);
        Task<List<CourseWithExamsDto>> GetCoursesWithExams(short studentId, byte careerPlanId, short subjectCode);
    }
}
