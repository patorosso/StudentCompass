using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace StudentCompass.Data.Repositories
{
    public class BaseRepository<T>
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<T> _logger;

        public BaseRepository(IConfiguration configuration, ILogger<T> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        protected async Task<SqlConnection?> CreateConnection()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                var connection = new SqlConnection(connectionString);
                await connection.OpenAsync();
                _logger.LogInformation("Connection opened");
                return connection;
            }
            catch (Exception ex)
            {
                _logger.LogError("Unable to open a connection with the DB. Details: " + ex.Message);
                return null;
            }
        }

    }
}
