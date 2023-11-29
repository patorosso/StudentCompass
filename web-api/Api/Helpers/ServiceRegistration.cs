using Api.Contracts;
using Api.Services;

namespace Api.Helpers
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IStudentRepository, StudentRepository>();

            return services;
        }
    }
}
