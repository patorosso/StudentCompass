using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using StudentCompass.Services.Contracts;
using StudentCompass.Services.Implementations;
using StudentCompass.Repositories.Contracts;
using StudentCompass.Repositories.Implementations;

namespace StudentCompass.Server.Helpers;

public static class ServiceRegistration
{
    public static IServiceCollection AddService(this IServiceCollection services, IConfiguration configuration)
    {
        //services.AddScoped<IAuthService, AuthService>();
        //services.AddAutoMapper(typeof(AutoMappingProfiles).Assembly);
        //services.AddHttpClient();

        services.AddScoped<IProgressService, ProgressService>();
        services.AddScoped<IProgressRepository, ProgressRepository>();

        // JwtToken

        var jwtKey = configuration["Jwt:Key"];

        if (jwtKey == null)
            throw new ArgumentNullException("Jwt:Key is missing in appsettings.json");

        var securityKey = Encoding.UTF8.GetBytes(jwtKey);

        services.AddSingleton<IJwtConfiguration, JwtConfiguration>();
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    //Validations
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    //Rules
                    LifetimeValidator = (nb, exp, t, p) =>
                        (nb == null || nb <= DateTime.UtcNow) && exp > DateTime.UtcNow,
                    IssuerSigningKey = new SymmetricSecurityKey(securityKey)
                };
            });

        return services;
    }
}