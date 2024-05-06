using StudentCompass.Data.Contracts;
using StudentCompass.Data.Data.Dtos;
using StudentCompass.Data.Data.Models;
using StudentCompass.Data.Helpers;
using StudentCompass.Services.Contracts;

namespace StudentCompass.Services.Services
{
    public class ProgressService : IProgressService
    {
        private readonly IProgressRepository _progressRepository;

        public ProgressService(IProgressRepository progressRepository)
        {
            _progressRepository = progressRepository;
        }

        public async Task<IEnumerable<SubjectCourseDto>> GetProgressOverview(short studentId, byte careerPlanId)
        {
            try
            {
                if (studentId <= 0)
                    throw new ArgumentException("Invalid studentId."); // Career is unsigned, so no check.

                _ = await _progressRepository.GetEnrollByStudentAndCareer(studentId, careerPlanId)
                    ?? throw new ArgumentException("Student is not enrolled in the career.");

                var correlativesDict = await _progressRepository.GetCorrelativesByCareer(careerPlanId);
                var subjectCourses = await _progressRepository.GetProgressOverviewCourses(studentId, careerPlanId);

                return MapCoursesToDtoAndCalculateStatus(subjectCourses, correlativesDict);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private IEnumerable<SubjectCourseDto> MapCoursesToDtoAndCalculateStatus(List<SubjectCourse> subjectCourses, IDictionary<short, List<short>> correlativesDict)
        {
            var approvedSubjects = subjectCourses.Where(sc => sc.StatusId == (byte)CourseStatus.Approved).ToList();

            var result = new List<SubjectCourseDto>();

            foreach (var subjectCourse in subjectCourses)
            {
                // Map course to dto
                var subjectCourseDto = new SubjectCourseDto()
                {
                    Code = subjectCourse.Code,
                    Description = subjectCourse.Description,
                    WeeklyHours = subjectCourse.WeeklyHours,
                    YearLevel = subjectCourse.YearLevel,
                    IsOptional = subjectCourse.IsOptional,
                    IsElective = subjectCourse.IsElective,
                    IsAnnual = subjectCourse.IsAnnual,
                    FinalGrade = subjectCourse.FinalGrade,
                    CourseId = subjectCourse.CourseId,
                    CareerPlanId = subjectCourse.CareerPlanId
                };

                // Calculate status
                if (subjectCourse.StatusId != null)
                    subjectCourseDto.Status = AcademicHelpers.GetStatusDescription(subjectCourse.StatusId);
                else
                {
                    correlativesDict.TryGetValue(subjectCourse.Code, out var correlatives);

                    if (correlatives == null || approvedSubjects.All(sc => correlatives.Contains(sc.Code)))
                        subjectCourseDto.Status = AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available);
                    else
                        subjectCourseDto.Status = AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable);
                }
                result.Add(subjectCourseDto);
            }

            return result;
        }
    }
}