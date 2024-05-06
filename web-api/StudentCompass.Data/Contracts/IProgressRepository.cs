using StudentCompass.Data.Data.Dtos;
using StudentCompass.Data.Data.Models;

namespace StudentCompass.Data.Contracts
{
    public interface IProgressRepository
    {
        Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId);
        Task SubjectToInProgress(int? courseId);
        Task<Dictionary<short, List<short>>> GetCorrelatives(byte careerPlanId);
        Task<IEnumerable<Subject>> UpdateSubjects(List<UpdateSubjectDto> subjectsToUpdate, short studentId, byte careerPlanId);
        Task<IEnumerable<SubjectDto>> CreateInProgressCourse(List<Subject> subjects, short studentId);
        Task<IEnumerable<Course>> GetCourses(short studentId, byte careerPlanId, short subjectCode);

        // new repo methods
        Task<List<Subject>> GetSubjectsByCareer(byte careerPlanId);
        Task<Dictionary<short, List<short>>> GetCorrelativesByCareer(byte careerPlanId);
        Task<(short, byte)?> GetEnrollByStudentAndCareer(short studentId, byte careerPlanId);
        Task<List<Course>> GetCoursesByCareerAndStudent(byte careerPlanId, short studentId);
        Task<List<SubjectCourse>> GetProgressOverviewCourses(short studentId, byte careerPlanId);
    }
}
