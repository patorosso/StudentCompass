using Microsoft.AspNetCore.Mvc;
using StudentCompass.Data.Dtos;
using StudentCompass.Services.Contracts;
using StudentCompass.Services.Implementations;

namespace StudentCompass.Server.Controllers.Auth
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService<AuthLocalService> _authLocalService;

        public AuthController(ILogger<AuthController> logger, IAuthService<AuthLocalService> authLocalService)
        {
            _logger = logger;
            _authLocalService = authLocalService;
        }

        [HttpPost]
        [Route("[Action]")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var (success, result) = await _authLocalService.Login(loginDto);

                if (!success) 
                    return BadRequest(result);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("[Action]")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                var (success, result) = await _authLocalService.Register(registerDto);

                if (!success)
                    return BadRequest(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
