using StudentCompass.Data.Contracts;
using StudentCompass.Data.Data.Models;
using StudentCompass.Services.Contracts;

namespace StudentCompass.Services.Services
{
    public class ProgressService : IProgressService
    {
        private readonly IProgressRepository _progressRepository;

        public ProgressService(IProgressRepository progressRepository)
        {
            _progressRepository = progressRepository;
        }

        public async Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId)
        {
            try
            {
                if (studentId <= 0 || careerPlanId <= 0)
                    throw new ArgumentException("Invalid studentId or careerPlanId.");



                var subjects = new List<Subject>();
                return subjects;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
