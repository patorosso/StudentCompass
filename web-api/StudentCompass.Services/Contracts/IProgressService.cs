using StudentCompass.Data.Data.Dtos;

namespace StudentCompass.Services.Contracts
{
    public interface IProgressService
    {
        Task<IEnumerable<SubjectCourseDto>> GetProgressOverview(short studentId, byte careerPlanId);
    }
}
