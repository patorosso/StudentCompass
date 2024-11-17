using Moq;
using Microsoft.Extensions.Logging;
using StudentCompass.Services.Contracts;
using StudentCompass.Repositories.Contracts;
using StudentCompass.Services.Implementations;
using StudentCompass.Data.Context;

namespace StudentCompass.TestsServices.Dashboard
{
    public class UpdateSubjectsTests
    {
        private readonly AppDbContext _context;
        private readonly IProgressService _progressService;
        private readonly Mock<ILogger<ProgressService>> _loggerMock;
        private readonly Mock<IProgressRepository> _progressRepositoryMock;

        public UpdateSubjectsTests()
        {
            _context = AppDbContext.CreateTestAppDbContext();
            _loggerMock = new Mock<ILogger<ProgressService>>();
            _progressRepositoryMock = new Mock<IProgressRepository>();

            _progressService = new ProgressService(_loggerMock.Object, _context);
        }


    }
}
