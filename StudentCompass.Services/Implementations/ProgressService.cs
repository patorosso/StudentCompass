using System.Data;
using StudentCompass.Data.Dtos;
using Microsoft.Data.SqlClient;
using StudentCompass.Data.Enums;
using StudentCompass.Data.Context;
using StudentCompass.Data.Entities;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using StudentCompass.Services.Contracts;

namespace StudentCompass.Services.Implementations
{
    public class ProgressService : IProgressService
    {
        private readonly AppDbContext _dbContext;
        private readonly ILogger<ProgressService> _logger;

        public ProgressService(ILogger<ProgressService> logger, AppDbContext context)
        {
            _logger = logger;
            _dbContext = context;
        }

        public async Task<List<GetProgressOverviewDto>> GetProgressOverview(short studentId, byte careerPlanId)
        {
            try
            {
                var subjects = await _dbContext
                    .Set<GetProgressOverviewDto>()
                    .FromSqlRaw(StoredProcedure
                    .GetProgressOverview("StudentId", studentId, "CareerPlanId", careerPlanId))
                    .ToListAsync();

                return subjects;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting progress overview.");
                throw;
            }
        }

        public async Task<List<GetProgressOverviewDto>> UpdateSubjects(List<SubjectToUpdateDto> subjectsToUpdate, short studentId, byte careerPlanId)
        {
            try
            {
                var dataTable = new DataTable();
                dataTable.Columns.Add("SubjectCode", typeof(short));
                dataTable.Columns.Add("CareerPlanId", typeof(byte));
                dataTable.Columns.Add("StatusId", typeof(byte));
                dataTable.Columns.Add("FinalGrade", typeof(byte));
                dataTable.Columns.Add("CourseId", typeof(int));

                // subject.FinalGrade == null ? DBNull.Value 
                foreach (var subject in subjectsToUpdate)
                    dataTable.Rows.Add(subject.Code, subject.CareerPlanId, subject.Status, subject.FinalGrade, subject.CourseId);

                var tvpParameter = new SqlParameter("@SubjectsToUpdate", SqlDbType.Structured)
                {
                    TypeName = "SubjectsToUpdateDto",
                    Value = dataTable
                };

                var result = await _dbContext
                    .Set<GetProgressOverviewDto>()
                    .FromSqlRaw(StoredProcedure
                    .UpdateSubjects("StudentId", studentId, "StudentCareerPlanId", careerPlanId, "SubjectsToUpdate", tvpParameter))
                    .ToListAsync();

                return result;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while updating subjects.");
                throw;
            }
        }

        public async Task<List<Course>> GetCoursesByCareerAndStudent(byte careerPlanId, short studentId)
        {
            try
            {
                var courses = await _dbContext.Course.Where(x => x.StudentId == studentId && x.CareerPlanId == careerPlanId).ToListAsync();
                return courses;
            }
            catch (Exception e) {
                _logger.LogError(e, "Error while getting courses.");
                throw;
            }
        }

        public async Task<List<Subject>> GetSubjectsByCareer(byte careerPlanId)
        {
            try
            {
                var subjects = await _dbContext.Subject.Where(x => x.CareerPlanId == careerPlanId).ToListAsync();
                return subjects;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting subjects.");
                throw;
            }
        }

        public async Task<Dictionary<short, List<short>>> GetCorrelativesByCareer(byte careerPlanId)
        {
            try
            {
                var correlatives = await _dbContext.Correlative
                    .Where(x => x.SubjectCareerPlanId == (byte)CareerPlanEnum.PlanTransversal || x.SubjectCareerPlanId == careerPlanId)
                    .ToListAsync();

                var correlativesDict = new Dictionary<short, List<short>>();

                foreach(var correlative in correlatives) { 

                    if (correlativesDict.TryGetValue(correlative.SubjectCode, out var correlativeList))
                        correlativeList?.Add(correlative.SubjectCode);
                    else
                        correlativesDict.Add(correlative.SubjectCode, [correlative.CorrelativeCode]);
                }

                return correlativesDict;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting correlatives.");
                throw;
            }
        }

        public async Task<(short, byte)?> GetEnrollByStudentAndCareer(short studentId, byte careerPlanId)
        {
            try 
            {
                var enrolled = await _dbContext.Enrolled
                    .Where(x => x.StudentId == studentId && x.CareerPlanId == careerPlanId)
                    .FirstOrDefaultAsync();

                return enrolled != null ? (enrolled.StudentId, enrolled.CareerPlanId) : null;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while getting correlatives.");
                throw;
            }
        }

        public async Task CourseToAttending(int? courseId)
        {
            try
            {
                await _dbContext.Database
                    .ExecuteSqlRawAsync(StoredProcedure
                    .CourseToAttending("CourseId", courseId));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while updating progress");
                throw;
            }
        }

        public async Task<List<SubjectDto>> CreateAttendingCourse(List<Subject> subjects, short studentId)
        {
            try
            {
                var subjectDtoList = new List<SubjectDto>();
                await _dbContext.Database.BeginTransactionAsync();

                foreach (var subject in subjects)
                {
                    var subjectDto = _dbContext.Set<SubjectDto>()
                                     .FromSqlRaw(StoredProcedure
                                     .CreateAttendingCourse("SubjectCode", subject.Code, "StudentId", 
                                     studentId, "CareerPlanId", subject.CareerPlanId));
                }

                await _dbContext.Database.CommitTransactionAsync();
                return subjectDtoList;
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                _logger.LogError(ex, "Error while creating attending course.");
                throw;
            }
        }



        //public async Task<IEnumerable<Course>> GetCourses(short studentId, byte careerPlanId, short subjectCode)
        //{
        //    await using var connection = await CreateConnection() ?? throw new SqlConnectionException("DB Connection could not be established.");

        //    await using var command = new SqlCommand("app.get_courses", connection);
        //    command.CommandType = CommandType.StoredProcedure;
        //    command.Parameters.Add(new SqlParameter("@student_id", studentId));
        //    command.Parameters.Add(new SqlParameter("@career_plan_id", careerPlanId));
        //    command.Parameters.Add(new SqlParameter("@subject_code", subjectCode));

        //    var courses = new List<Course>();
        //    var courseExams = new Dictionary<int, List<Exam>>();

        //    await using var reader = await command.ExecuteReaderAsync();
        //    while (reader.Read())
        //    {
        //        var course = new Course
        //        {
        //            Id = (int)reader["id"],
        //            Term = reader["term_id"] is DBNull ? default : AcademicHelpers.GetTerm((byte)reader["term_id"]),
        //            Year = reader["year"] is DBNull ? default : ((short)reader["year"]).ToString(),
        //            StatusId = (byte)reader["status_id"],
        //            FinalGrade = reader["final_grade"] is DBNull ? default : (byte)reader["final_grade"],
        //            SubjectCode = (short)reader["subject_code"],
        //            CareerPlanId = (byte)reader["career_plan_id"]
        //        };
        //        courses.Add(course);
        //    }

        //    await reader.NextResultAsync();
        //    while (reader.Read())
        //    {
        //        var exam = new Exam
        //        {
        //            Grade = (byte)reader["grade"],
        //            Description = AcademicHelpers.GetExamDescription((ExamType)(byte)reader["exam_id"]),
        //            Date = (DateTime)reader["taken_on"]
        //        };

        //        var examCourseId = (int)reader["course_id"];

        //        if (!courseExams.ContainsKey(examCourseId))
        //            courseExams[examCourseId] = new List<Exam>();

        //        courseExams[examCourseId].Add(exam);
        //    }

        //    if (courseExams.IsNullOrEmpty())
        //        return courses.AsEnumerable();

        //    foreach (var course in courses)
        //        if (courseExams.TryGetValue(course.Id, out var examsList))
        //            course.Exams = examsList;

        //    return courses.AsEnumerable();
        //}
    }
}