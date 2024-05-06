using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using StudentCompass.Data.Contracts;
using StudentCompass.Data.Data.Dtos;
using StudentCompass.Data.Data.Models;
using StudentCompass.Data.Helpers;
using StudentCompass.Services.Contracts;

namespace StudentCompass.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly IProgressRepository _progressRepository;
        private readonly IProgressService _progressService;
        private readonly ILogger<ProgressController> _logger;

        public ProgressController(IProgressRepository progressRepository, IProgressService progressService, ILogger<ProgressController> logger)
        {
            _progressRepository = progressRepository;
            _progressService = progressService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> IndexGet(short studentId, byte careerPlanId)
        {
            try
            {
                var progressOverview = await _progressService.GetProgressOverview(studentId, careerPlanId);
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
                await _progressRepository.SubjectToInProgress(courseId);
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
        public async Task<IActionResult> CreateInProgressCourse([FromBody] List<Subject> subjects, short studentId)
        {
            try
            {
                var newCurrentSubjects = await _progressRepository.CreateInProgressCourse(subjects, studentId);
                return Ok(newCurrentSubjects);
            }
            catch (SqlException e)
            {
                return BadRequest("The operation failed and all changes made have been reverted. " + e.Message);
            }
            catch (SqlConnectionException e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("getCorrelatives")]
        public async Task<IActionResult> GetCorrelatives(byte careerPlanId)
        {
            try
            {
                var correlatives = await _progressRepository.GetCorrelatives(careerPlanId);
                return Ok(correlatives);
            }
            catch (SqlException e)
            {
                return BadRequest("The operation failed. " + e.Message);
            }
            catch (SqlConnectionException e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        [Route("updateSubjects")]
        public async Task<IActionResult> UpdateSubjects([FromBody] List<UpdateSubjectDto> subjectsToUpdate, short studentId, byte careerPlanId)
        {
            try
            {
                var updatedSubjects = await _progressRepository.UpdateSubjects(subjectsToUpdate, studentId, careerPlanId);
                return Ok(updatedSubjects);
            }
            catch (SqlException e)
            {
                return BadRequest(new { message = "The operation failed and all changes made have been reverted. " + e.Message });

            }
            catch (SqlConnectionException e)
            {
                return StatusCode(500, new { message = e.Message });
            }
        }

        [HttpGet]
        [Route("getCourses")]
        public async Task<IActionResult> GetCourses(short studentId, byte careerPlanId, short subjectCode)
        {
            try
            {
                var courses = await _progressRepository.GetCourses(studentId, careerPlanId, subjectCode);
                return Ok(new Dictionary<short, IEnumerable<Course>> { { subjectCode, courses } });
            }
            catch (SqlException e)
            {
                return BadRequest("The operation failed. " + e.Message);
            }
            catch (SqlConnectionException e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
