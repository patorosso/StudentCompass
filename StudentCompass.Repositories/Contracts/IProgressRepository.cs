using StudentCompass.Data.Entities;

namespace StudentCompass.Repositories.Contracts
{
    public interface IProgressRepository
    {
        Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId);

    }
}
