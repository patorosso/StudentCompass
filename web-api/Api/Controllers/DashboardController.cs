using Api.Data.Dtos;
using Api.Data.Models;
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
        public async Task<IActionResult> CreateInProgressCourse([FromBody] List<Subject> subjects, short studentId)
        {
            try
            {
                var newCurrentSubjects = await _academicRepository.CreateInProgressCourse(subjects, studentId);
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
                var correlatives = await _academicRepository.GetCorrelatives(careerPlanId);
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
                var updatedSubjects = await _academicRepository.UpdateSubjects(subjectsToUpdate, studentId, careerPlanId);
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
                var courses = await _academicRepository.GetCourses(studentId, careerPlanId, subjectCode);
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
