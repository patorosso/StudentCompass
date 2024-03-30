using Api.Data.Dtos;
using Api.Data.Models;

namespace Api.Services.Contracts
{
    public interface IAcademicRepository
    {
        Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId);
        Task SubjectToInProgress(int? courseId);
        Task<IEnumerable<SubjectDto>> CreateInProgressCourse(List<Subject> subjects, short studentId);
    }
}
