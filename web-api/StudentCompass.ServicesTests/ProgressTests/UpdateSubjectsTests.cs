using Moq;
using StudentCompass.Data.Contracts;
using StudentCompass.Services.Contracts;
using StudentCompass.Services.Services;

namespace StudentCompass.ServicesTests.ProgressTests
{
    public class UpdateSubjectsTests
    {
        private readonly Mock<IProgressRepository> _progressRepositoryMock = new();
        private readonly IProgressService _progressService;

        public UpdateSubjectsTests()
        {
            _progressService = new ProgressService(_progressRepositoryMock.Object);
        }


    }
}
