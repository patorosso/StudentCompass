using Api.Data.Dtos;
using Api.Services.Contracts;
using Microsoft.Data.SqlClient;

namespace Api.Services.Repositories
{
    public class StudentRepository : BaseRepository<StudentRepository>, IStudentRepository
    {
        private readonly ILogger<StudentRepository> _logger;
        public StudentRepository(IConfiguration configuration, ILogger<StudentRepository> logger) : base(configuration, logger)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<StudentDto>> GetStudents()
        {
            try
            {
                var connection = await CreateConnection();
                await using var command = new SqlCommand("SELECT * FROM app.student", connection);
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
