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

        // No approved subjects, one correlative unavailable and one available
        [Fact]
        public void GetProgressOverview_OneCorrelativeAndNoApprovedSubjects_ReturnsStatus()
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

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 2, new List<short> { 1 } }
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(result[0].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[1].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable));
            Assert.Equal(result[2].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
        }

        // No approved subjects, two correlatives unavailable from different subjects
        [Fact]
        public void GetProgressOverview_TwoCorrelativesAndNoApprovedSubjectsFromDifferentSubjects_ReturnsStatus()
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
                CreateSubjectCourse(3, null, null, careerPlanId, null),
                CreateSubjectCourse(4, null, null, careerPlanId, null),
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 2, new List<short> { 1 } },
                { 4, new List<short> { 3 } }
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(result[0].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[1].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable));
            Assert.Equal(result[2].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[3].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable));
        }

        // No approved subjects, two correlatives unavailable from the same subjects
        [Fact]
        public void GetProgressOverview_TwoCorrelativesAndNoApprovedSubjectsFromSameSubjects_ReturnsStatus()
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
                CreateSubjectCourse(3, null, null, careerPlanId, null),
                CreateSubjectCourse(4, null, null, careerPlanId, null),
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 2, new List<short> { 1 } },
                { 4, new List<short> { 1 } }
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(result[0].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[1].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable));
            Assert.Equal(result[2].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[3].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable));
        }

        // No approved subjects and one subject needs two correlatives
        [Fact]
        public void GetProgressOverview_TwoCorrelativesInSameSubject_ReturnsStatus()
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
                CreateSubjectCourse(3, null, null, careerPlanId, null),
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 3, new List<short> { 1,2 } },
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(result[0].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[1].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available));
            Assert.Equal(result[2].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable));
        }

        // Approved subjects but no correlatives
        [Fact]
        public void GetProgressOverview_NoCorrelativesAndAllApprovedSubjects_ReturnsAllApproved()
        {
            // Arrange
            const short studentId = 1;
            const byte careerPlanId = 1;
            _progressRepositoryMock
                .Setup(x => x.GetEnrollByStudentAndCareer(studentId, careerPlanId))
                .Returns(Task.FromResult<(short, byte)?>((studentId, careerPlanId)));

            var subjectCourses = new List<SubjectCourse>
            {
                CreateSubjectCourse(1, 10, 1, careerPlanId, CourseStatus.Approved),
                CreateSubjectCourse(2, 10, 1, careerPlanId, CourseStatus.Approved),
                CreateSubjectCourse(3, 10, 1, careerPlanId, CourseStatus.Approved)
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
            Assert.Equal(result[0].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved));
            Assert.Equal(result[1].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved));
            Assert.Equal(result[2].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved));
        }

        // Approved subjects but with correlatives
        [Fact]
        public void GetProgressOverview_CorrelativesAndAllApprovedSubjects_ReturnsAllApproved()
        {
            // Arrange
            const short studentId = 1;
            const byte careerPlanId = 1;
            _progressRepositoryMock
                .Setup(x => x.GetEnrollByStudentAndCareer(studentId, careerPlanId))
                .Returns(Task.FromResult<(short, byte)?>((studentId, careerPlanId)));

            var subjectCourses = new List<SubjectCourse>
            {
                CreateSubjectCourse(1, 10, 1, careerPlanId, CourseStatus.Approved),
                CreateSubjectCourse(2, 10, 1, careerPlanId, CourseStatus.Approved),
                CreateSubjectCourse(3, 10, 1, careerPlanId, CourseStatus.Approved),
                CreateSubjectCourse(4, 10, 1, careerPlanId, CourseStatus.Approved)
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 2, new List<short> { 1 } },
                { 3, new List<short> { 1 } },
                { 4, new List<short> { 1, 2, 3 } }
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(result[0].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved));
            Assert.Equal(result[1].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved));
            Assert.Equal(result[2].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved));
            Assert.Equal(result[3].Status, AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved));
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
