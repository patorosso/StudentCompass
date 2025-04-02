using Microsoft.AspNetCore.Mvc;
using StudentCompass.Services.Contracts;

namespace StudentCompass.Server.Controllers.Dashboard
{
    [Route("dashboard/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly IProgressService _progressService;
        private readonly ILogger<ProgressController> _logger;

        public ProgressController(ILogger<ProgressController> logger, IProgressService progressService)
        {
            _logger = logger;
            _progressService = progressService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProgressOverview(byte careerPlan)
        {
            try
            {
                //TODO: Get studentId from token
                short studentId = 1;

                var progressOverview = await _progressService.GetProgressOverview(studentId, careerPlan);
                return Ok(progressOverview);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //[HttpPatch]
        //public async Task<IActionResult> SubjectToInProgress(int courseId)
        //{
        //    try
        //    {
        //        await _progressRepository.SubjectToInProgress(courseId);
        //        return Ok();
        //    }
        //    catch (Exception e)
        //    {
        //        _logger.LogError(e, "Error while updating progress");
        //        return StatusCode(500, "Internal server error");
        //    }
        //}

        //[HttpPost]
        //[Route("createInProgressCourse")]
        //public async Task<IActionResult> CreateInProgressCourse([FromBody] List<Subject> subjects, short studentId)
        //{
        //    try
        //    {
        //        var newCurrentSubjects = await _progressRepository.CreateInProgressCourse(subjects, studentId);
        //        return Ok(newCurrentSubjects);
        //    }
        //    catch (SqlException e)
        //    {
        //        return BadRequest("The operation failed and all changes made have been reverted. " + e.Message);
        //    }
        //    catch (SqlConnectionException e)
        //    {
        //        return StatusCode(500, e.Message);
        //    }
        //}

        //[HttpGet]
        //[Route("getCorrelatives")]
        //public async Task<IActionResult> GetCorrelatives(byte careerPlanId)
        //{
        //    try
        //    {
        //        var correlatives = await _progressRepository.GetCorrelatives(careerPlanId);
        //        return Ok(correlatives);
        //    }
        //    catch (SqlException e)
        //    {
        //        return BadRequest("The operation failed. " + e.Message);
        //    }
        //    catch (SqlConnectionException e)
        //    {
        //        return StatusCode(500, e.Message);
        //    }
        //}

        //[HttpPut]
        //[Route("updateSubjects")]
        //public async Task<IActionResult> UpdateSubjects([FromBody] List<UpdateSubjectDto> subjectsToUpdate, short studentId, byte careerPlanId)
        //{
        //    try
        //    {
        //        var updatedSubjects = await _progressRepository.OldUpdateSubjects(subjectsToUpdate, studentId, careerPlanId);
        //        return Ok(updatedSubjects);
        //    }
        //    catch (SqlException e)
        //    {
        //        return BadRequest(new { message = "The operation failed and all changes made have been reverted. " + e.Message });

        //    }
        //    catch (SqlConnectionException e)
        //    {
        //        return StatusCode(500, new { message = e.Message });
        //    }
        //}

        //[HttpGet]
        //[Route("getCourses")]
        //public async Task<IActionResult> GetCourses(short studentId, byte careerPlanId, short subjectCode)
        //{
        //    try
        //    {
        //        var courses = await _progressRepository.GetCourses(studentId, careerPlanId, subjectCode);
        //        return Ok(new Dictionary<short, IEnumerable<Course>> { { subjectCode, courses } });
        //    }
        //    catch (SqlException e)
        //    {
        //        return BadRequest("The operation failed. " + e.Message);
        //    }
        //    catch (SqlConnectionException e)
        //    {
        //        return StatusCode(500, e.Message);
        //    }
        //}
    }
}
