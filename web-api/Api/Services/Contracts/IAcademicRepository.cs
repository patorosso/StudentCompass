using Api.Data.Models;

namespace Api.Services.Contracts
{
    public interface IAcademicRepository
    {
        Task<IEnumerable<Subject>> GetProgressOverview();
    }
}
