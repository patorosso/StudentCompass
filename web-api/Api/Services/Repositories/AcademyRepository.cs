using Api.Data.Models;
using Api.Services.Contracts;

namespace Api.Services.Repositories
{
    public class AcademyRepository : IAcademicRepository
    {
        public async Task<IEnumerable<Subject>> GetProgressOverview()
        {
            await Task.Delay(1000);
            return new List<Subject>();
        }
    }
}
