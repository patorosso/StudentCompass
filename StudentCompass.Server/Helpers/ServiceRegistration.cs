using StudentCompass.Services.Contracts;
using StudentCompass.Services.Implementations;

namespace StudentCompass.Server.Helpers;

public static class ServiceRegistration
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IAuthService<AuthLocalService>>();
        //services.AddAutoMapper(typeof(AutoMappingProfiles).Assembly);
        //services.AddHttpClient();

        services.AddScoped<IProgressService, ProgressService>();

        return services;
    }
}