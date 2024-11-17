using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudentCompass.Data.Context;
using StudentCompass.Data.Dtos;
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
                    .FromSqlRaw(StoreProcedure
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

        #region Old Methods

        //public async Task<IEnumerable<Subject>> UpdateSubjects(List<UpdateSubjectDto> subjectsToUpdate, short studentId, byte careerPlanId)
        //{
        //    if (studentId <= 0)
        //        throw new ArgumentException("Invalid studentId."); // Career is unsigned, so no check.

        //    _ = await _progressRepository.GetEnrollByStudentAndCareer(studentId, careerPlanId)
        //        ?? throw new ArgumentException("Student is not enrolled in the career.");

        //    // Sorting the original list by subject code
        //    subjectsToUpdate.Sort((a, b) => a.Code.CompareTo(b.Code));

        //    return await _progressRepository.OldUpdateSubjects(subjectsToUpdate, studentId, careerPlanId);


        //}

        //private IEnumerable<SubjectCourseDto> MapCoursesToDtoAndCalculateStatus(List<SubjectCourse> subjectCourses, IDictionary<short, List<short>> correlativesDict)
        //{
        //    var approvedSubjects = subjectCourses.Where(sc => sc.StatusId == (byte)CourseStatus.Approved).ToList();

        //    var result = new List<SubjectCourseDto>();

        //    foreach (var subjectCourse in subjectCourses)
        //    {
        //        // Map course to dto
        //        var subjectCourseDto = new SubjectCourseDto()
        //        {
        //            Code = subjectCourse.Code,
        //            Description = subjectCourse.Description,
        //            WeeklyHours = subjectCourse.WeeklyHours,
        //            YearLevel = subjectCourse.YearLevel,
        //            IsOptional = subjectCourse.IsOptional,
        //            IsElective = subjectCourse.IsElective,
        //            IsAnnual = subjectCourse.IsAnnual,
        //            FinalGrade = subjectCourse.FinalGrade,
        //            CourseId = subjectCourse.CourseId,
        //            CareerPlanId = subjectCourse.CareerPlanId
        //        };

        //        // Calculate status
        //        if (subjectCourse.StatusId != null)
        //            subjectCourseDto.Status = AcademicHelpers.GetStatusDescription(subjectCourse.StatusId);
        //        else
        //        {
        //            correlativesDict.TryGetValue(subjectCourse.Code, out var correlatives);
        //            var allCorrelativesApproved = correlatives == null || correlatives.All(c => approvedSubjects.Exists(sc => sc.Code == c));

        //            subjectCourseDto.Status = allCorrelativesApproved ?
        //                AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available) :
        //                AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable);
        //        }
        //        result.Add(subjectCourseDto);
        //    }

        //    return result;
        //}
        #endregion

    }
}