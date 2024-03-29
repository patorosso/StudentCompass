using Api.Data.Models;
using Api.Services.Contracts;
using Api.Services.Helpers;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
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
                var courseSubject = new Dictionary<int?, Subject>();
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
                        FinalGrade = reader["final_grade"] is DBNull ? default(byte?) : (byte)reader["final_grade"]
                    };

                    subjects.Add(subject);

                    var subjectCourseId = reader["course_id"] is DBNull ? null : (int?)reader["course_id"];

                    if (subjectCourseId != null)
                        courseSubject[subjectCourseId] = subject;
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

                foreach (var courseSubjectKey in courseSubject.Keys)
                {
                    if (courseExams.TryGetValue(courseSubjectKey, out var examsList))
                    {
                        if (courseSubject.TryGetValue(courseSubjectKey, out var subject))
                            subject.Exams = examsList;
                    }
                }

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
    }
}
