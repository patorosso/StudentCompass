using NLog;
using NLog.Web;
using System.Text;
using StudentCompass.Server.Helpers;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services
    builder.Services.AddControllers();
    builder.Services.AddCustomServices(builder.Configuration);

    // Database
    DatabaseConfigurator.ConfigureDatabase(builder.Services, builder.Configuration);

    // NLog
    builder.Logging.ClearProviders();
    builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
    builder.Host.UseNLog();

    // CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
            policy =>
            {
                policy.WithOrigins("https://localhost:5173")
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
    });

    // JWT
    string jwtKey = builder.Configuration["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key is missing in appsettings.json");
    var securityKey = Encoding.UTF8.GetBytes(jwtKey);
    builder.Services.AddSingleton<IJwtConfiguration, JwtConfiguration>();
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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

    var app = builder.Build();

    app.UseCors("AllowSpecificOrigin");
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
    app.MapFallbackToFile("/index.html");
    app.Run();
}
catch (Exception e)
{
    logger.Error(e, "Program terminated unexpectedly");
    throw;
}
finally
{
    NLog.LogManager.Shutdown();
}
