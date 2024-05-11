using Moq;
using StudentCompass.Data.Contracts;
using StudentCompass.Data.Data.Models;
using StudentCompass.Data.Helpers;
using StudentCompass.Services.Contracts;
using StudentCompass.Services.Services;

namespace StudentCompass.ServicesTests.ProgressTests
{
    public class GetProgressOverviewTests
    {
        private readonly Mock<IProgressRepository> _progressRepositoryMock = new();
        private readonly IProgressService _progressService;

        public GetProgressOverviewTests()
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

        // No correlatives and no courses
        [Fact]
        public void GetProgressOverview_EmptyCorrelativesAndNoCourses_ReturnsAllAvailable()
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
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[2].Status);

        }

        // No courses, one correlative unavailable and one available
        [Fact]
        public void GetProgressOverview_OneCorrelativeAndNoCourses_ReturnsStatus()
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
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[2].Status);
        }

        // No courses, two correlatives unavailable from different subjects
        [Fact]
        public void GetProgressOverview_TwoCorrelativesAndNoCoursesFromDifferentSubjects_ReturnsStatus()
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
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[2].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[3].Status);
        }

        // No courses, two correlatives unavailable from the same subjects
        [Fact]
        public void GetProgressOverview_TwoCorrelativesAndNoCoursesFromSameSubjects_ReturnsStatus()
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
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[2].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[3].Status);
        }

        // No courses and one subject needs two correlatives
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
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[2].Status);
        }

        // In progress subject with no correlatives
        [Fact]
        public void GetProgressOverview_NoCorrelativesAndInProgressSubject_ReturnsInProgress()
        {
            // Arrange
            const short studentId = 1;
            const byte careerPlanId = 1;
            _progressRepositoryMock
                .Setup(x => x.GetEnrollByStudentAndCareer(studentId, careerPlanId))
                .Returns(Task.FromResult<(short, byte)?>((studentId, careerPlanId)));

            var subjectCourses = new List<SubjectCourse>
            {
                CreateSubjectCourse(1, null, null, careerPlanId, CourseStatus.InProgress),
                CreateSubjectCourse(2, null, null, careerPlanId, null),
                CreateSubjectCourse(3, null, null, careerPlanId, null),
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
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.InProgress), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[2].Status);
        }

        // In progress with unrelated correlatives
        [Fact]
        public void GetProgressOverview_UnrelatedCorrelativesAndInProgressSubject_ReturnsInProgress()
        {
            // Arrange
            const short studentId = 1;
            const byte careerPlanId = 1;
            _progressRepositoryMock
                .Setup(x => x.GetEnrollByStudentAndCareer(studentId, careerPlanId))
                .Returns(Task.FromResult<(short, byte)?>((studentId, careerPlanId)));

            var subjectCourses = new List<SubjectCourse>
            {
                CreateSubjectCourse(1, null, null, careerPlanId, CourseStatus.InProgress),
                CreateSubjectCourse(2, null, null, careerPlanId, null),
                CreateSubjectCourse(3, null, null, careerPlanId, null),
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 3, new List<short> { 2 } },
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.InProgress), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[2].Status);
        }

        // In progress subject with correlatives
        [Fact]
        public void GetProgressOverview_CorrelativesAndInProgressSubject_ReturnsInProgress()
        {
            // Arrange
            const short studentId = 1;
            const byte careerPlanId = 1;
            _progressRepositoryMock
                .Setup(x => x.GetEnrollByStudentAndCareer(studentId, careerPlanId))
                .Returns(Task.FromResult<(short, byte)?>((studentId, careerPlanId)));

            var subjectCourses = new List<SubjectCourse>
            {
                CreateSubjectCourse(1, null, 1, careerPlanId, CourseStatus.InProgress),
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
                { 3, new List<short> { 1 } },
                { 4, new List<short> { 1, 2, 3 } }
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.InProgress), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[2].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[3].Status);
        }

        // One approved and one in progress subject with correlatives
        [Fact]
        public void GetProgressOverview_CorrelativesAndOneApprovedSubject_ReturnsStatus()
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
                CreateSubjectCourse(2, null, 2, careerPlanId, CourseStatus.InProgress),
                CreateSubjectCourse(3, null, null, careerPlanId, null),
                CreateSubjectCourse(4, null, null, careerPlanId, null),
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 2, new List<short> { 1 } },
                { 3, new List<short> { 1 } },
                { 4, new List<short> { 2 } }
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.InProgress), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[2].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[3].Status);
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
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[2].Status);
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
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[2].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[3].Status);
        }

        // One approved subject, one correlative made available
        [Fact]
        public void GetProgressOverview_TwoCorrelativesAndNoApprovedSubjectsFromSameSubjects_ReturnsStatu()
        {
            // Arrange
            const short studentId = 1;
            const byte careerPlanId = 1;
            _progressRepositoryMock
                .Setup(x => x.GetEnrollByStudentAndCareer(studentId, careerPlanId))
                .Returns(Task.FromResult<(short, byte)?>((studentId, careerPlanId)));

            var subjectCourses = new List<SubjectCourse>
            {
                CreateSubjectCourse(1, null, 1, careerPlanId, CourseStatus.Approved),
                CreateSubjectCourse(2, null, null, careerPlanId, null),
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 2, new List<short> { 1 } },
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[1].Status);
        }

        // Three approved subjects and two in progress with correlatives
        [Fact]
        public void GetProgressOverview_CorrelativesAndApprovedAndInProgressSubjects_ReturnsStatus()
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
                CreateSubjectCourse(2, 10, 2, careerPlanId, CourseStatus.Approved),
                CreateSubjectCourse(3, 10, 3, careerPlanId, CourseStatus.Approved),
                CreateSubjectCourse(4, null, 4, careerPlanId, CourseStatus.InProgress),
                CreateSubjectCourse(5, null, 5, careerPlanId, CourseStatus.InProgress),
                CreateSubjectCourse(6, null, null, careerPlanId, null),
                CreateSubjectCourse(7, null, null, careerPlanId, null),
                CreateSubjectCourse(8, null, null, careerPlanId, null),
                CreateSubjectCourse(9, null, null, careerPlanId, null),
            };
            _progressRepositoryMock
                .Setup(x => x.GetProgressOverviewCourses(studentId, careerPlanId))
                .Returns(Task.FromResult(subjectCourses));

            var correlativesDict = new Dictionary<short, List<short>>
            {
                { 2, new List<short> { 1 } },
                { 3, new List<short> { 2, 3 } },
                { 4, new List<short> { 1 } },
                { 5, new List<short> { 3 } },
                { 6, new List<short> { 1 } },
                { 7, new List<short> { 1, 4 } },
                { 8, new List<short> { 4, 5 } }
            };
            _progressRepositoryMock
                .Setup(x => x.GetCorrelativesByCareer(careerPlanId))
                .Returns(Task.FromResult(correlativesDict));

            // Act
            var result = _progressService.GetProgressOverview(studentId, careerPlanId).Result.ToList();

            // Assert
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[0].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[1].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Approved), result[2].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.InProgress), result[3].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.InProgress), result[4].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[5].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[6].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.NotAvailable), result[7].Status);
            Assert.Equal(AcademicHelpers.GetStatusDescription((byte)CourseStatus.Available), result[8].Status);

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
