using Api.Data.Dtos;
using Api.Services.Contracts;
using Microsoft.Data.SqlClient;

namespace Api.Services.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<StudentRepository> _logger;
        public StudentRepository(IConfiguration configuration, ILogger<StudentRepository> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<IEnumerable<StudentDto>> GetStudents()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");

                await using var connection = new SqlConnection(connectionString);

                const string sql = "SELECT * FROM app.student";

                await using var command = new SqlCommand(sql, connection);

                connection.Open();

                _logger.LogInformation("Connection opened");

                await using var reader = await command.ExecuteReaderAsync();

                var students = new List<StudentDto>();

                while (reader.Read())
                {
                    var student = new StudentDto
                    {
                        Name = reader["username"].ToString()!,
                        Mail = "Not implemented yet",
                        IsActive = (bool)reader["is_active"]
                    };

                    students.Add(student);
                }

                return students.AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting students");
                throw;
            }
        }
    }
}
