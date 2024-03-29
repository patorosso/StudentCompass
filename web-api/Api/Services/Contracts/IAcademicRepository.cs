using Api.Data.Models;

namespace Api.Services.Contracts
{
    public interface IAcademicRepository
    {
        Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId);
        Task SubjectToInProgress(int? courseId);
        Task<int> CreateInProgressCourse(short code, short student, byte career);
    }
}
