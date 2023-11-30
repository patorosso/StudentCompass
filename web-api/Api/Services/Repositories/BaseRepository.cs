using Microsoft.Data.SqlClient;

namespace Api.Services.Repositories
{
    public class BaseRepository
    {
        private readonly IConfiguration _configuration;

        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected async Task<SqlConnection> CreateConnection()
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();
            return connection;
        }

    }
}
