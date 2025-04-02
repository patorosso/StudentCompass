using Microsoft.Extensions.Logging;
using StudentCompass.Data.Context;
using StudentCompass.Data.Dtos;
using StudentCompass.Services.Helpers;
using StudentCompass.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace StudentCompass.Services.Implementations
{
    public class AuthLocalService : IAuthLocalService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthLocalService> _logger;

        public AuthLocalService(IConfiguration configuration, ILogger<AuthLocalService> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
            _configuration = configuration;
        }

        public Task<bool> IsTokenValid(string token)
        {
            throw new NotImplementedException();
        }

        // TODO: Cambiar id de user por CWID
        public async Task<(bool, object)> Login(LoginDto loginDto)
        {
            try 
            {
                await ValidateLogin(loginDto);

                var session = new
                {
                    UserId = loginDto.Username,
                    Token = Guid.NewGuid().ToString(),
                    ExpiryDate = DateTime.Now.AddHours(1)
                };

                return (true, session);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while logging in.");
                throw;
            }
        }

        public Task<(bool, object)> Register(RegisterDto registerDto)
        {
            throw new NotImplementedException();
        }

        #region PrivateMethods

        private async Task ValidateLogin(LoginDto loginDto)
        {
            if (loginDto == null)
            {
                _logger.LogWarning($"Invalid login details.");
                throw new AuthException("Invalid login details.");
            }

            if (string.IsNullOrEmpty(loginDto.Username) || string.IsNullOrEmpty(loginDto.Password))
            {
                _logger.LogWarning($"Invalid login details for Username: {loginDto.Username} - Password: {loginDto.Password}");
                throw new AuthException("Invalid username or password.");
            }

            var user = await _context.User.FirstOrDefaultAsync(u => u.Username == loginDto.Username);

            if (user == null)
            {
                _logger.LogWarning($"User does not exist. Invalid login details for Username: {loginDto.Username} - Password: {loginDto.Password}");
                throw new AuthException("User does not exist. Invalid username or password.");
            }

            var encryptedPassword = Encrypt(loginDto.Password);

            if (user.Pass != encryptedPassword)
            {
                _logger.LogWarning($"Invalid password for Username: {loginDto.Username} - Password: {loginDto.Password}");
                throw new AuthException("Invalid username or password.");
            }
        }

        private string Encrypt(string text)
        {
            var encryptionKey = _configuration["EncryptionKey"];

            if(string.IsNullOrEmpty(encryptionKey))
                throw new Exception("Encryption key not found in configuration.");

            using (var aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(encryptionKey);
                aesAlg.GenerateIV();

                var encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(text);
                        }
                    }

                    var ivWithCipherText = aesAlg.IV.Concat(msEncrypt.ToArray()).ToArray();
                    return Convert.ToBase64String(ivWithCipherText);
                }
            }
        }

        private string Decrypt(string text)
        {
            var encryptionKey = _configuration["EncryptionKey"];

            if (string.IsNullOrEmpty(encryptionKey))
                throw new Exception("Encryption key not found in configuration.");

            using (var aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(encryptionKey);
                aesAlg.IV = Convert.FromBase64String(text).Take(16).ToArray();

                var decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                using (var msDecrypt = new MemoryStream(Convert.FromBase64String(text).Skip(16).ToArray()))
                {
                    using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (var srDecrypt = new StreamReader(csDecrypt))
                        {
                            return srDecrypt.ReadToEnd();
                        }
                    }
                }
            }
        }

        #endregion


    }
}
