using System.Runtime.Serialization;

namespace StudentCompass.Data.Dtos
{
    public class LoginDto
    {
        [DataMember(Name = "username")]
        public string Username { get; set; } = null!;
        [DataMember(Name = "password")]
        public string Password { get; set; } = null!;
    }
    public class RegisterDto
    {
        [DataMember(Name = "username")]
        public string Username { get; set; } = null!;
        [DataMember(Name = "password")]
        public string Password { get; set; } = null!;
        [DataMember(Name = "humanConfirmation")]
        public string HumanConfirmation { get; set; } = null!;
    }
}
