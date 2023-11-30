using Api.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IAcademicRepository _academicRepository;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(IAcademicRepository academicRepository, ILogger<DashboardController> logger)
        {
            _academicRepository = academicRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> IndexGet()
        {
            try
            {
                var progressOverview = await _academicRepository.GetProgressOverview();
                return Ok(progressOverview);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting progress overview");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
