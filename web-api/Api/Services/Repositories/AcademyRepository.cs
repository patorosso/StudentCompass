using Api.Data.Models;
using Api.Services.Contracts;
using Api.Services.Helpers;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.Data;

namespace Api.Services.Repositories
{
    public class AcademyRepository : BaseRepository<AcademyRepository>, IAcademicRepository
    {
        private readonly ILogger<AcademyRepository> _logger;
        public AcademyRepository(IConfiguration configuration, ILogger<AcademyRepository> logger) : base(configuration, logger)
        {
            _logger = logger;
        }

        public async Task<int> CreateInProgressCourse(short code, short student, byte career)
        {

            await using var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");
            await using var command = new SqlCommand("app.create_in_progress_course", connection);

            // Prepare params
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add(new SqlParameter("@subject_code", code));
            command.Parameters.Add(new SqlParameter("@student_id", student));
            command.Parameters.Add(new SqlParameter("@career_plan_id", career));
            var newCourseIdParam = new SqlParameter("@new_course_id", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };
            command.Parameters.Add(newCourseIdParam);

            await command.ExecuteNonQueryAsync();
            return (int)newCourseIdParam.Value;
        }

        public async Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId)
        {
            SqlConnection? connection = null;
            SqlCommand? command = null;
            SqlDataReader? reader = null;

            try
            {
                connection = await CreateConnection();
                _logger.LogInformation("Connection opened");

                command = new SqlCommand("app.academic_student_info", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@student_id", studentId));
                command.Parameters.Add(new SqlParameter("@career_plan_id", careerPlanId));

                var subjects = new List<Subject>();
                var courseExams = new Dictionary<int?, List<Exam>>();

                reader = await command.ExecuteReaderAsync();
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
                        Status = AcademicHelpers.GetStatusDescription((SubjectStatus)(byte)reader["status"]),
                        FinalGrade = reader["final_grade"] is DBNull ? default(byte?) : (byte)reader["final_grade"],
                        CourseId = reader["course_id"] is DBNull ? null : (int?)reader["course_id"]
                    };

                    subjects.Add(subject);
                }

                await reader.NextResultAsync();
                while (reader.Read())
                {
                    var exam = new Exam
                    {
                        Grade = (byte)reader["grade"],
                        Description = AcademicHelpers.GetExamDescription((ExamType)(byte)reader["exam_id"])
                    };

                    var examCourseId = (int)reader["course_id"];

                    if (!courseExams.ContainsKey(examCourseId))
                        courseExams[examCourseId] = new List<Exam>();

                    courseExams[examCourseId].Add(exam);
                }

                if (courseExams.IsNullOrEmpty())
                    return subjects.AsEnumerable();

                foreach (var subject in subjects.Where(x => x.CourseId != null))
                    if (courseExams.TryGetValue(subject.CourseId, out var examsList))
                        subject.Exams = examsList;


                return subjects.AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting students");
                throw;
            }
            finally
            {
                if (reader != null)
                    await reader.DisposeAsync();

                if (command != null)
                    await command.DisposeAsync();

                if (connection != null)
                    await connection.DisposeAsync();
            }
        }

        public async Task SubjectToInProgress(int? courseId)
        {
            SqlConnection? connection = null;
            SqlCommand? command = null;

            try
            {
                connection = await CreateConnection();
                _logger.LogInformation("Connection opened");

                command = new SqlCommand("app.subject_to_in_progress", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@course_id", courseId));

                await command.ExecuteNonQueryAsync();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while updating progress");
                throw;
            }
            finally
            {
                if (command != null)
                    await command.DisposeAsync();

                if (connection != null)
                    await connection.DisposeAsync();
            }
        }

    }
}
