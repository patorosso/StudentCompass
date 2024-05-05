using StudentCompass.Data.Contracts;
using StudentCompass.Data.Repositories;
using StudentCompass.Services.Contracts;
using StudentCompass.Services.Services;

namespace StudentCompass.Web.Helpers
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            // Repositories
            services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped<IProgressRepository, ProgressRepository>(); // todo: singleton ... ?

            // Services
            services.AddScoped<IProgressService, ProgressService>();

            return services;
        }
    }
}
