using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using StudentCompass.Data.Contracts;
using StudentCompass.Data.Data.Dtos;
using StudentCompass.Data.Data.Models;
using StudentCompass.Data.Helpers;
using System.Data;

namespace StudentCompass.Data.Repositories
{
    public class ProgressRepository : BaseRepository<ProgressRepository>, IProgressRepository
    {
        private readonly ILogger<ProgressRepository> _logger;
        public ProgressRepository(IConfiguration configuration, ILogger<ProgressRepository> logger) : base(configuration, logger)
        {
            _logger = logger;
        }

        public async Task<List<SubjectCourse>> GetProgressOverviewCourses(short studentId, byte careerPlanId)
        {
            var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            var approvedOrInProgressCte = "WITH approved_or_in_progress_subjects AS (" +
                                          "SELECT subject_code, career_plan_id, status_id, final_grade, id " +
                                          "FROM app.course c " +
                                          $"WHERE student_id = {studentId} " +
                                          $"AND status_id IN ({CourseStatus.Approved},{CourseStatus.InProgress}) " +
                                          $"AND career_plan_id IN ({Constants.TransversalCode},{careerPlanId})),";

            var careerSubjectsCte = "career_subjects AS ( SELECT * FROM app.subject " +
                                    $"WHERE career_plan_id IN ({Constants.TransversalCode},{careerPlanId})) ";

            var query = approvedOrInProgressCte + careerSubjectsCte +
                        "SELECT * FROM approved_or_in_progress_subjects ap " +
                        "RIGHT JOIN career_subjects s ON ap.subject_code = s.code";

            await using var command = new SqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();

            var courses = MapSubjectCourses(reader);

            await CloseConnection(connection, command, reader);
            return courses;
        }

        public async Task<List<Course>> GetCoursesByCareerAndStudent(byte careerPlanId, short studentId)
        {
            var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            var query = $"SELECT * FROM app.course WHERE student_id = {studentId} AND career_plan_id = {careerPlanId}";
            await using var command = new SqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();

            var courses = MapCourses(reader);

            await CloseConnection(connection, command, reader);
            return courses;
        }

        public async Task<List<Subject>> GetSubjectsByCareer(byte careerPlanId)
        {
            var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            var query = $"SELECT * FROM app.subject WHERE career_plan_id = {careerPlanId}";
            await using var command = new SqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();

            var subjects = MapSubjects(reader);

            await CloseConnection(connection, command, reader);
            return subjects;
        }

        public async Task<Dictionary<short, List<short>>> GetCorrelativesByCareer(byte careerPlanId)
        {
            var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            var query = $"SELECT * FROM app.correlative WHERE subject_career_plan_id = {careerPlanId}";
            await using var command = new SqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();

            var correlatives = MapCorrelatives(reader);

            await CloseConnection(connection, command, reader);
            return correlatives;
        }

        public async Task<(short, byte)?> GetEnrollByStudentAndCareer(short studentId, byte careerPlanId)
        {
            var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            var query = $"SELECT * FROM app.student s JOIN app.enrolled e ON s.id = e.student_id " +
                        $"WHERE s.id = {studentId} AND e.career_plan_id = {careerPlanId}";

            await using var command = new SqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();

            var enroll = MapEnroll(reader);

            await CloseConnection(connection, command, reader);
            return enroll;
        }

        private List<SubjectCourse> MapSubjectCourses(SqlDataReader reader)
        {
            var subjectCourses = new List<SubjectCourse>();
            while (reader.Read())
            {
                var subjectCourse = new SubjectCourse
                {
                    Code = (short)reader["code"],
                    Description = (string)reader["description"],
                    WeeklyHours = (byte)reader["weekly_hours"],
                    YearLevel = (byte)reader["year_level"],
                    IsOptional = (bool)reader["is_optional"],
                    IsElective = (bool)reader["is_elective"],
                    IsAnnual = (bool)reader["is_annual"],
                    StatusId = (byte)reader["status_id"],
                    FinalGrade = reader["final_grade"] is DBNull ? default : (byte)reader["final_grade"],
                    CourseId = reader["id"] is DBNull ? default : (int)reader["id"],
                    CareerPlanId = (byte)reader["career_plan_id"]
                };
                subjectCourses.Add(subjectCourse);
            }
            return subjectCourses;
        }

        private List<Course> MapCourses(SqlDataReader reader)
        {
            var courses = new List<Course>();
            while (reader.Read())
            {
                var course = new Course
                {
                    Id = (int)reader["id"],
                    Term = reader["term_id"] is DBNull ? default : AcademicHelpers.GetTerm((byte)reader["term_id"]),
                    Year = reader["year"] is DBNull ? default : ((short)reader["year"]).ToString(),
                    StatusId = (byte)reader["status_id"],
                    FinalGrade = reader["final_grade"] is DBNull ? default : (byte)reader["final_grade"],
                    SubjectCode = (short)reader["subject_code"],
                    CareerPlanId = (byte)reader["career_plan_id"]
                };
                courses.Add(course);
            }
            return courses;
        }

        private List<Subject> MapSubjects(IDataReader reader)
        {
            var subjects = new List<Subject>();

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
                };
                subjects.Add(subject);
            }
            return subjects;
        }

        private Dictionary<short, List<short>> MapCorrelatives(IDataReader reader)
        {
            var correlatives = new Dictionary<short, List<short>>();

            while (reader.Read())
            {
                var subjectCode = (short)reader["subject_code"];
                var correlativeCode = (short)reader["correlative_code"];

                if (correlatives.TryGetValue(subjectCode, out var correlativeList))
                    correlativeList?.Add(correlativeCode);
                else
                    correlatives.Add(subjectCode, new List<short> { correlativeCode });
            }

            return correlatives;
        }

        private (short, byte)? MapEnroll(IDataReader reader)
        {
            if (!reader.Read())
                return null;

            var studentId = (short)reader["student_id"];
            var careerPlanId = (byte)reader["career_plan_id"];
            return (studentId, careerPlanId);
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
                table.Rows.Add(subject.Code, subject.CareerPlanId, AcademicHelpers.GetStatusId(subject.Status),
                    subject.FinalGrade == null ? DBNull.Value : subject.FinalGrade, subject.CourseId);

            var tvpParam = command.Parameters.AddWithValue("@subjects_to_update", table);
            tvpParam.SqlDbType = SqlDbType.Structured;
            tvpParam.TypeName = "app.subjects_to_update_type";


            var subjects = new List<Subject>();
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
                    CareerPlanId = (byte)reader["career_plan_id"]
                };

                subjects.Add(subject);
            }

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
            SqlTransaction? transaction = null;

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
                transaction?.DisposeAsync();
            }

            return subjectDtoList;
        }

        public async Task<IEnumerable<Course>> GetCourses(short studentId, byte careerPlanId, short subjectCode)
        {
            await using var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

            await using var command = new SqlCommand("app.get_courses", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add(new SqlParameter("@student_id", studentId));
            command.Parameters.Add(new SqlParameter("@career_plan_id", careerPlanId));
            command.Parameters.Add(new SqlParameter("@subject_code", subjectCode));

            var courses = new List<Course>();
            var courseExams = new Dictionary<int, List<Exam>>();

            await using var reader = await command.ExecuteReaderAsync();
            while (reader.Read())
            {
                var course = new Course
                {
                    Id = (int)reader["id"],
                    Term = reader["term_id"] is DBNull ? default : AcademicHelpers.GetTerm((byte)reader["term_id"]),
                    Year = reader["year"] is DBNull ? default : ((short)reader["year"]).ToString(),
                    StatusId = (byte)reader["status_id"],
                    FinalGrade = reader["final_grade"] is DBNull ? default : (byte)reader["final_grade"],
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
                    Description = AcademicHelpers.GetExamDescription((ExamType)(byte)reader["exam_id"]),
                    Date = (DateTime)reader["taken_on"]
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
            SqlCommand? command = null;
            SqlDataReader? reader = null;
            SqlConnection? connection = null;

            try
            {
                connection = await CreateConnection();
                _logger.LogInformation("Connection opened");

                command = new SqlCommand("app.academic_student_info", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@student_id", studentId));
                command.Parameters.Add(new SqlParameter("@career_plan_id", careerPlanId));

                var subjects = new List<Subject>();

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
            SqlCommand? command = null;
            SqlConnection? connection = null;

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
