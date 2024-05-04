using Microsoft.AspNetCore.Mvc;
using StudentCompass.Data.Contracts;

namespace StudentCompass.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        private readonly ILogger<StudentsController> _logger;

        public StudentsController(IStudentRepository studentRepository, ILogger<StudentsController> logger)
        {
            _studentRepository = studentRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> IndexGet()
        {
            try
            {
                var students = await _studentRepository.GetStudents();
                return Ok(students);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting students");
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
