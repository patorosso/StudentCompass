using Api.Services.Contracts;
using Api.Services.Repositories;

namespace Api.Services.Helpers
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped<IAcademicRepository, AcademicRepository>(); // todo: singleton ... ?

            return services;
        }
    }
}
