using StudentCompass.Data.Dtos;

namespace StudentCompass.Services.Contracts
{
    public interface IProgressService
    {
        Task<List<GetProgressOverviewDto>> GetProgressOverview(short studentId, byte careerPlanId);
    }
}
