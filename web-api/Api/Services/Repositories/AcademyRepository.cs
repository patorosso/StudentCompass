using Api.Data.Models;
using Api.Services.Contracts;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Api.Services.Repositories
{
    public class AcademyRepository : BaseRepository, IAcademicRepository
    {
        private readonly ILogger<AcademyRepository> _logger;
        public AcademyRepository(IConfiguration configuration, ILogger<AcademyRepository> logger) : base(configuration)
        {
            _logger = logger;
        }

        public async Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId)
        {
            try
            {
                var connection = await CreateConnection();
                _logger.LogInformation("Connection opened");

                await using var command = new SqlCommand("app.academic_student_info", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@student_id", studentId));
                command.Parameters.Add(new SqlParameter("@career_plan_id", careerPlanId));

                var subjects = new List<Subject>();
                await using var reader = await command.ExecuteReaderAsync();

                while (reader.Read())
                {
                    var subject = new Subject
                    {
                        Code = (short)reader["code"],
                        Description = (string)reader["description"],
                        IsElective = (bool)reader["is_elective"],
                        IsAnnual = (bool)reader["is_annual"],
                        IsOptional = (bool)reader["is_optional"],
                        WeeklyHours = (byte)reader["weekly_hours"],
                        YearLevel = (byte)reader["year_level"],
                        Status = reader["status_id"] is DBNull ? default(SubjectStatus) : (SubjectStatus)Enum.ToObject(typeof(SubjectStatus), reader["status_id"]),
                        FinalGrade = reader["final_grade"] is DBNull ? default(byte?) : (byte)reader["final_grade"],
                        IsAvailable = Convert.ToBoolean(reader["is_available"])
                    };

                    subjects.Add(subject);
                }

                return subjects.AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting students");
                throw;
            }
        }
    }
}
