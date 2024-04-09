using Api.Data.Dtos;
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

        public async Task<IEnumerable<Subject>> UpdateSubjects(List<UpdateSubjectDto> subjectsToUpdate, short studentId, byte careerPlanId)
        {
            await using var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            await using var command = new SqlCommand("app.update_subjects", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@student_id", studentId);
            command.Parameters.AddWithValue("@student_career_plan_id", careerPlanId);
            var table = new DataTable();
            table.Columns.Add("subject_code", typeof(short));
            table.Columns.Add("career_plan_id", typeof(byte));
            table.Columns.Add("status_id", typeof(byte));
            table.Columns.Add("final_grade", typeof(byte));
            table.Columns.Add("course_id", typeof(int));

            foreach (var subject in subjectsToUpdate)
                table.Rows.Add(subject.Code, subject.CareerPlanId, AcademicHelpers.GetStatusId(subject.Status), subject.FinalGrade, subject.CourseId);

            var tvpParam = command.Parameters.AddWithValue("@subjects_to_update", table);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = "app.subjects_to_update_type";


            var subjects = new List<Subject>();
            var courseExams = new Dictionary<int?, List<Exam>>();
            await using var reader = await command.ExecuteReaderAsync();

            while (reader.Read())
            {
                var subject = new Subject
                {
                    Code = (short)reader["code"],
                    IsAnnual = (bool)reader["is_annual"],
                    YearLevel = (byte)reader["year_level"],
                    IsOptional = (bool)reader["is_optional"],
                    IsElective = (bool)reader["is_elective"],
                    WeeklyHours = (byte)reader["weekly_hours"],
                    Description = (string)reader["description"],
                    CareerPlanId = (byte)reader["career_plan_id"],
                    CourseId = reader["course_id"] is DBNull ? null : (int?)reader["course_id"],
                    Status = AcademicHelpers.GetStatusDescription((SubjectStatus)(byte)reader["status"]),
                    FinalGrade = reader["final_grade"] is DBNull ? default(byte?) : (byte)reader["final_grade"]
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

        public async Task<Dictionary<short, List<short>>> GetCorrelatives(byte careerPlanId)
        {
            await using var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            await using var command = new SqlCommand("app.get_career_correlatives", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add(new SqlParameter("@career_plan_id", careerPlanId));

            var correlativeDtoDict = new Dictionary<short, List<short>>();

            await using var reader = await command.ExecuteReaderAsync();
            while (reader.Read())
            {
                var subjectRead = (short)reader["subject_code"];
                var correlativeRead = (short)reader["correlative_code"];

                if (correlativeDtoDict.TryGetValue(subjectRead, out var correlativesList))
                    correlativesList?.Add(correlativeRead);
                else
                    correlativeDtoDict.Add(subjectRead, new List<short> { correlativeRead });
            }
            reader.Close();

            return correlativeDtoDict;
        }

        public async Task<IEnumerable<SubjectDto>> CreateInProgressCourse(List<Subject> subjects, short studentId)
        {
            await using var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");
            var subjectDtoList = new List<SubjectDto>();
            SqlTransaction transaction = null;

            try
            {
                transaction = connection.BeginTransaction();

                foreach (var subject in subjects)
                {
                    await using var command = new SqlCommand("app.create_in_progress_course", connection, transaction);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@subject_code", subject.Code));
                    command.Parameters.Add(new SqlParameter("@student_id", studentId));
                    command.Parameters.Add(new SqlParameter("@career_plan_id", subject.CareerPlanId));

                    await using var reader = await command.ExecuteReaderAsync();
                    while (reader.Read())
                    {
                        var subjectDto = new SubjectDto
                        {
                            CourseId = (int)reader["course_id"],
                            Code = (short)reader["subject_code"]
                        };

                        subjectDtoList.Add(subjectDto);
                    }
                    reader.Close();
                }

                transaction.Commit();
            }
            catch (SqlException)
            {
                transaction?.Rollback();
                throw;
            }
            finally
            {
                transaction?.Dispose();
            }

            return subjectDtoList;
        }

        public async Task<IEnumerable<Course>> GetCourses(short studentId, byte careerPlanId)
        {
            await using var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            await using var command = new SqlCommand("app.get_courses", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add(new SqlParameter("@student_id", studentId));
            command.Parameters.Add(new SqlParameter("@career_plan_id", careerPlanId));

            var courses = new List<Course>();
            var courseExams = new Dictionary<int, List<Exam>>();

            await using var reader = await command.ExecuteReaderAsync();
            while (reader.Read())
            {
                var course = new Course
                {
                    Id = (int)reader["id"],
                    Term = reader["term"] is DBNull ? default(byte?) : (byte)reader["term"],
                    Year = reader["year"] is DBNull ? default(short?) : (short)reader["year"],
                    Status = AcademicHelpers.GetStatusDescription((SubjectStatus)(byte)reader["status"]),
                    FinalGrade = reader["final_grade"] is DBNull ? default(byte?) : (byte)reader["final_grade"],
                    SubjectCode = (short)reader["subject_code"],
                    CareerPlanId = (byte)reader["career_plan_id"]
                };
                courses.Add(course);
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
                return courses.AsEnumerable();

            foreach (var course in courses)
                if (courseExams.TryGetValue(course.Id, out var examsList))
                    course.Exams = examsList;

            return courses.AsEnumerable();
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
                        IsAnnual = (bool)reader["is_annual"],
                        YearLevel = (byte)reader["year_level"],
                        IsOptional = (bool)reader["is_optional"],
                        IsElective = (bool)reader["is_elective"],
                        WeeklyHours = (byte)reader["weekly_hours"],
                        Description = (string)reader["description"],
                        CareerPlanId = (byte)reader["career_plan_id"],
                        CourseId = reader["course_id"] is DBNull ? null : (int?)reader["course_id"],
                        Status = AcademicHelpers.GetStatusDescription((SubjectStatus)(byte)reader["status"]),
                        FinalGrade = reader["final_grade"] is DBNull ? default(byte?) : (byte)reader["final_grade"]
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
