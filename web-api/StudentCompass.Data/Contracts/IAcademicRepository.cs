using StudentCompass.Data.Data.Dtos;
using StudentCompass.Data.Data.Models;

namespace StudentCompass.Data.Contracts
{
    public interface IAcademicRepository
    {
        Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId);
        Task SubjectToInProgress(int? courseId);
        Task<Dictionary<short, List<short>>> GetCorrelatives(byte careerPlanId);
        Task<IEnumerable<Subject>> UpdateSubjects(List<UpdateSubjectDto> subjectsToUpdate, short studentId, byte careerPlanId);
        Task<IEnumerable<SubjectDto>> CreateInProgressCourse(List<Subject> subjects, short studentId);
        Task<IEnumerable<Course>> GetCourses(short studentId, byte careerPlanId, short subjectCode);

        // new repo methods
        Task<List<Subject>> GetSubjectsByCareer(byte careerPlanId);
        Task<List<(short, short)>> GetCorrelativesByCareer(byte careerPlanId);
    }
}
