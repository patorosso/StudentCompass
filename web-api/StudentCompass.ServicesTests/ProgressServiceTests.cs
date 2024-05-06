using Moq;
using StudentCompass.Data.Contracts;
using StudentCompass.Data.Data.Models;
using StudentCompass.Data.Helpers;
using StudentCompass.Services.Contracts;
using StudentCompass.Services.Services;

namespace StudentCompass.ServicesTests
{
    public class ProgressServiceTests
    {
        private readonly Mock<IProgressRepository> _progressRepositoryMock = new();
        private readonly IProgressService _progressService;

        public ProgressServiceTests()
        {
            _progressService = new ProgressService(_progressRepositoryMock.Object);
        }

        #region GetProgressOverview

        [Fact]
        public void GetProgressOverview_InputNegativeInvalidStudentId_ThrowsException()
        {
            // Arrange
            const short invalidStudentId = -1;
            const byte careerPlanId = 1;

            // Act
            Assert.ThrowsAsync<ArgumentException>(() => _progressService.GetProgressOverview(invalidStudentId, careerPlanId));
        }

        [Fact]
        public void GetProgressOverview_InputZeroInvalidStudentId_ThrowsException()
        {
            // Arrange
            const short invalidStudentId = 0;
            const byte careerPlanId = 1;

            // Act
            Assert.ThrowsAsync<ArgumentException>(() => _progressService.GetProgressOverview(invalidStudentId, careerPlanId));
        }

        [Fact]
        public void GetProgressOverview_NullEnrollment_ThrowsException()
        {
            // Arrange
            const short studentId = 1;
            const byte careerPlanId = 1;
            _progressRepositoryMock
                .Setup(x => x.GetEnrollByStudentAndCareer(studentId, careerPlanId))
                .Returns(Task.FromResult<(short, byte)?>(null));

            // Act
            Assert.ThrowsAsync<ArgumentException>(() => _progressService.GetProgressOverview(studentId, careerPlanId));
        }

        // No correlatives and no approved subjects
        [Fact]
        public void GetProgressOverview_EmptyCorrelativesAndNoApprovedSubjects_ReturnsAllAvailable()
        {
            // Arrange
            const short studentId = 1;
            const byte careerPlanId = 1;
            _progressRepositoryMock
                .Setup(x => x.GetEnrollByStudentAndCareer(studentId, careerPlanId))
                .Returns(Task.FromResult<(short, byte)?>((studentId, careerPlanId)));

            var subjectCourses = new List<SubjectCourse>
            {
                CreateSubjectCourse(1, null, null, careerPlanId, null),
                CreateSubjectCourse(2, null, null, careerPlanId, null),
                CreateSubjectCourse(3, null, null, careerPlanId, null)
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>();
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(result[0].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[1].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[2].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
        }

        #endregion

        #region CreateMethods

        private SubjectCourse CreateSubjectCourse(short code, byte? grade, int? courseId, byte career, CourseStatus? status)
        {
            return new SubjectCourse
            {
                Code = code,
                FinalGrade = grade,
                CourseId = courseId,
                CareerPlanId = career,
                StatusId = (byte?)status
            };
        }

        #endregion


    }
}
