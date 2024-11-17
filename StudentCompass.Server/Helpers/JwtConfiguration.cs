using System.Text;
using Microsoft.Extensions.Configuration;

namespace StudentCompass.Server.Helpers
{
    public class JwtConfiguration : IJwtConfiguration
    {
        public byte[] Key { get; }
        public string Issuer { get; }
        public string? Audience { get; }
        public double Lifetime { get; }

        public JwtConfiguration(IConfiguration config)
        {
            var key = config["Jwt:Key"];
            var issuer = config["Jwt:Issuer"];
            var lifetime = config["Jwt:Lifetime"];

            if(key == null || issuer == null || lifetime == null)
                throw new ArgumentNullException("Jwt:Key, Jwt:Issuer or Jwt:Lifetime is missing in appsettings.json");

            Key = Encoding.UTF8.GetBytes(key);
            Issuer = issuer;
            Lifetime = Convert.ToDouble(lifetime);
        }
    }
}
