using StudentCompass.Data.Dtos;

namespace StudentCompass.Services.Contracts
{
    public interface IAuthService<T> where T : class
    {
        Task<bool> IsTokenValid(string token);
        Task<(bool, object)> Login(LoginDto loginDto);
        Task<(bool, object)> Register(RegisterDto registerDto);
    }
}
