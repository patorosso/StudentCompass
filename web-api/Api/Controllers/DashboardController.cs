using Api.Services.Contracts;
using Api.Services.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

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
        public async Task<IActionResult> IndexGet(short studentId, byte careerPlanId)
        {
            try
            {
                var progressOverview = await _academicRepository.GetProgressOverview(studentId, careerPlanId);
                return Ok(progressOverview);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting progress overview");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPatch]
        public async Task<IActionResult> SubjectToInProgress(int courseId)
        {
            try
            {
                await _academicRepository.SubjectToInProgress(courseId);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while updating progress");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Route("createInProgressCourse")]
        public async Task<ActionResult> CreateInProgressCourse(short code, short student, byte career)
        {
            try
            {
                var courseId = await _academicRepository.CreateInProgressCourse(code, student, career);
                return Ok(courseId);
            }
            catch (SqlException e)
            {
                return BadRequest(e.Message);
            }
            catch (SqlConnectionException e)
            {
                return StatusCode(500, e.Message);
            }
        }

    }
}
