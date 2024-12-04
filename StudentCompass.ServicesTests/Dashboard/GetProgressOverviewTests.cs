using Moq;
using StudentCompass.Data.Context;
using Microsoft.Extensions.Logging;
using StudentCompass.Services.Contracts;
using StudentCompass.Services.Implementations;
using StudentCompass.Data.Entities;
using StudentCompass.Data.Enums;


namespace StudentCompass.TestsServices.Dashboard
{
    public class GetProgressOverviewTests : IDisposable
    {
        private readonly AppDbContext _context;
        private readonly IProgressService _progressService;
        private readonly Mock<ILogger<ProgressService>> _loggerMock;

        // TODO: Más adelante hay que validar si:
        // 1 - El estudiante existe
        // 2 - Si está inscripto [ENROLLED] a ese plan de carrera
        public GetProgressOverviewTests()
        {
            _context = AppDbContext.CreateTestAppDbContext();
            _loggerMock = new Mock<ILogger<ProgressService>>();
            _progressService = new ProgressService(_loggerMock.Object, _context);

            _context.Database.BeginTransaction();
            InitialSeed();
        }

        [Fact]
        public void GetProgressOverview_InputNegativeInvalidStudentId_ThrowsException()
        {
            // Arrange
            const short invalidStudentId = -1;
            const byte careerPlanId = 0;

            // Act & Assert
            Assert.ThrowsAsync<ArgumentException>(() => _progressService.GetProgressOverview(invalidStudentId, careerPlanId));
        }

        // No correlatives and no courses
        [Fact]
        public async void GetProgressOverview_EmptyCoursesAndNoCorrelatives_ReturnsAllAvailable()
        {
            // Arrange
            const short studentId = 1;
            var transversalDepartment = new Department {Id = (byte)DepartmentEnum.Transversal, Description = "Test" };
            var chosenDepartment = new Department {Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var transversalCareer = new Career { Id = (byte)CareerEnum.Transversal, Description = "Test", DepartmentId = transversalDepartment.Id, Department = transversalDepartment };
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            var randomCareer = new Career { Id = (byte)CareerEnum.Arquitectura, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var transversalPlan = new CareerPlan { Id = (byte)CareerPlanEnum.PlanTransversal, Description = "Test", CareerId = transversalCareer.Id, Career = transversalCareer };
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            var randomPlan = new CareerPlan { Id= (byte)CareerPlanEnum.Plan2015Arquitectura, Description = "Test", CareerId = randomCareer.Id, Career = randomCareer };
            _context.SaveChanges();

            _context.Department.AddRange(transversalDepartment, chosenDepartment);
            _context.Career.AddRange(transversalCareer, chosenCareer);
            _context.CareerPlan.AddRange(transversalPlan, chosenCareerPlan, randomPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = transversalPlan.Id, CareerPlan = transversalPlan });
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = randomPlan.Id, CareerPlan = randomPlan });
            _context.SaveChanges();                                                           

            // Act
            var result = await _progressService.GetProgressOverview(studentId, chosenCareerPlan.Id);

            // Assert
            var expectedCount = _context.Subject.Count(s => s.CareerPlanId == chosenCareerPlan.Id|| s.CareerPlanId == transversalPlan.Id);
            Assert.Equal(expectedCount, result.Count);
            Assert.All(result, result =>
            {
                Assert.Null(result.FinalGrade);
                Assert.Null(result.CourseId);
                Assert.Equal(CourseStatusEnum.Available, result.Status);
            });
        }

        // No courses, one correlative unavailable and one available
        [Fact]
        public async void GetProgressOverview_OneCorrelativeAndNoCourses_ReturnsStatus()
        {
            // Arrange
            const short studentId = 1;
            var transversalDepartment = new Department { Id = (byte)DepartmentEnum.Transversal, Description = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var transversalCareer = new Career { Id = (byte)CareerEnum.Transversal, Description = "Test", DepartmentId = transversalDepartment.Id, Department = transversalDepartment };
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            var randomCareer = new Career { Id = (byte)CareerEnum.Arquitectura, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var transversalPlan = new CareerPlan { Id = (byte)CareerPlanEnum.PlanTransversal, Description = "Test", CareerId = transversalCareer.Id, Career = transversalCareer };
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            var randomPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2015Arquitectura, Description = "Test", CareerId = randomCareer.Id, Career = randomCareer };
            _context.SaveChanges();

            _context.Department.AddRange(transversalDepartment, chosenDepartment);
            _context.Career.AddRange(transversalCareer, chosenCareer);
            _context.CareerPlan.AddRange(transversalPlan, chosenCareerPlan, randomPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 100, Description = "Test", CareerPlanId = transversalPlan.Id, CareerPlan = transversalPlan });
            _context.Subject.Add(new Subject { Code = 300, Description = "Test", CareerPlanId = randomPlan.Id, CareerPlan = randomPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 2, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(studentId, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 100).Status);
        }

        //// No courses, two correlatives unavailable from different subjects
        [Fact]
        public async void GetProgressOverview_TwoCorrelativesAndNoCoursesFromDifferentSubjects_ReturnsStatus()
        {
            // Arrange
            const short studentId = 1;
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 4, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 2, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(studentId, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 3).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 4).Status);
        }

        //// No courses, two correlatives unavailable from the same subjects
        [Fact]
        public async void GetProgressOverview_TwoCorrelativesAndNoCoursesFromSameSubjects_ReturnsStatus()
        {
            // Arrange
            const short studentId = 1;
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 4, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 2, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(studentId, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 3).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 4).Status);
        }

        //// No courses and one subject needs two correlatives
        [Fact]
        public async void GetProgressOverview_TwoCorrelativesInSameSubject_ReturnsStatus()
        {
            // Arrange
            const short studentId = 1;
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 3, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 3, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(studentId, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 3).Status);
        }

        //// Attending subject with no correlatives
        [Fact]
        public async void GetProgressOverview_NoCorrelativesAndAttendingSubject_ReturnsAttendingAndAvailables()
        {
            // Arrange
            var student = new User { Username = "Test", Pass = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.User.Add(student);
            _context.SaveChanges();
            _context.Course.Add( new Course { UserId = student.Id, SubjectCode = 1, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Attending });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(student.Id, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Attending, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 3).Status);
        }

        //// In progress with unrelated correlatives
        [Fact]
        public async void GetProgressOverview_UnrelatedCorrelativesAndInProgressSubject_ReturnsInProgress()
        {
            // Arrange
            var student = new User { Username = "Test", Pass = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 3, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            _context.User.Add(student);
            _context.SaveChanges();
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 1, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Attending });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(student.Id, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Attending, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 3).Status);
        }

        //// In progress subject with correlatives
        [Fact]
        public async void GetProgressOverview_CorrelativesAndInProgressSubject_ReturnsInProgress()
        {
            // Arrange
            var student = new User { Username = "Test", Pass = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 4, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 2, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 3, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 3, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            _context.User.Add(student);
            _context.SaveChanges();
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 1, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Attending });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(student.Id, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Attending, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 3).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 4).Status);
        }

        //// One approved and one in progress subject with correlatives
        [Fact]
        public async void GetProgressOverview_CorrelativesAndOneApprovedSubject_ReturnsStatus()
        {
            // Arrange
            var student = new User { Username = "Test", Pass = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 4, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 2, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 3, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            _context.User.Add(student);
            _context.SaveChanges();
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 1, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 2, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Attending });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(student.Id, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.Attending, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 3).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 4).Status);
        }

        //// Approved subjects but no correlatives
        [Fact]
        public async void GetProgressOverview_NoCorrelativesAndAllApprovedSubjects_ReturnsAllApproved()
        {
            // Arrange
            var student = new User { Username = "Test", Pass = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.User.Add(student);
            _context.SaveChanges();
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 1, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 2, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(student.Id, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 2).Status);
        }

        //// Approved subjects but with correlatives
        [Fact]
        public async void GetProgressOverview_CorrelativesAndAllApprovedSubjects_ReturnsAllApproved()
        {
            // Arrange
            var student = new User { Username = "Test", Pass = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 4, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 2, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 3, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 3, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            _context.User.Add(student);
            _context.SaveChanges();
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 1, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 2, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 3, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 4, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(student.Id, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 3).Status);
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 4).Status);
        }

        //// One approved subject, one correlative made available
        [Fact]
        public async void GetProgressOverview_TwoCorrelativesAndNoApprovedSubjectsFromSameSubjects_ReturnsStatu()
        {
            // Arrange
            var student = new User { Username = "Test", Pass = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 2, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            _context.User.Add(student);
            _context.SaveChanges();
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 1, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(student.Id, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 2).Status);
        }

        //// Three approved subjects and two in progress with correlatives
        [Fact]
        public async void GetProgressOverview_CorrelativesAndApprovedAndInProgressSubjects_ReturnsStatus()
        {
            // Arrange
            var student = new User { Username = "Test", Pass = "Test" };
            var chosenDepartment = new Department { Id = (byte)DepartmentEnum.Ingenieria, Description = "Test" };
            _context.SaveChanges();
            var chosenCareer = new Career { Id = (byte)CareerEnum.IngenieriaInformatica, Description = "Test", DepartmentId = chosenDepartment.Id, Department = chosenDepartment };
            _context.SaveChanges();
            var chosenCareerPlan = new CareerPlan { Id = (byte)CareerPlanEnum.Plan2009IngenieriaInformatica, Description = "Test", CareerId = chosenCareer.Id, Career = chosenCareer };
            _context.SaveChanges();

            _context.Department.AddRange(chosenDepartment);
            _context.Career.AddRange(chosenCareer);
            _context.CareerPlan.AddRange(chosenCareerPlan);
            _context.Subject.Add(new Subject { Code = 1, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 2, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 3, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 4, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 5, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 6, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 7, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 8, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.Subject.Add(new Subject { Code = 9, Description = "Test", CareerPlanId = chosenCareerPlan.Id, CareerPlan = chosenCareerPlan });
            _context.SaveChanges();

            _context.Correlative.Add(new Correlative { SubjectCode = 2, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 3, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 3, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 2, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 4, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 5, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 3, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 6, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 7, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 1, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 7, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 4, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 8, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 4, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.Correlative.Add(new Correlative { SubjectCode = 8, SubjectCareerPlanId = chosenCareerPlan.Id, CorrelativeCode = 5, CorrelativeCareerPlanId = chosenCareerPlan.Id });
            _context.SaveChanges();

            _context.User.Add(student);
            _context.SaveChanges();
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 1, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 2, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 3, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Approved });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 4, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Attending });
            _context.Course.Add(new Course { UserId = student.Id, SubjectCode = 5, CareerPlanId = chosenCareerPlan.Id, StatusId = (byte)CourseStatusEnum.Attending });
            _context.SaveChanges();

            // Act
            var result = await _progressService.GetProgressOverview(student.Id, chosenCareerPlan.Id);

            // Assert
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 1).Status);
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 2).Status);
            Assert.Equal(CourseStatusEnum.Approved, result.First(x => x.Code == 3).Status);
            Assert.Equal(CourseStatusEnum.Attending, result.First(x => x.Code == 4).Status);
            Assert.Equal(CourseStatusEnum.Attending, result.First(x => x.Code == 5).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 6).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 7).Status);
            Assert.Equal(CourseStatusEnum.NotAvailable, result.First(x => x.Code == 8).Status);
            Assert.Equal(CourseStatusEnum.Available, result.First(x => x.Code == 9).Status);

        }

        private async void InitialSeed()
        {
            var courseStatuses = new List<CourseStatus>
            {
                new CourseStatus { Id = 1, Description = "Aprobada" },
                new CourseStatus { Id = 2, Description = "Desaprobada" },
                new CourseStatus { Id = 3, Description = "Cursando" },
                new CourseStatus { Id = 4, Description = "Cursada" },
                new CourseStatus { Id = 5, Description = "Diponible" },
                new CourseStatus { Id = 6, Description = "No disponible" },
                new CourseStatus { Id = 7, Description = "Ausente" }
            };

            var exams = new List<Exam>
            {
                new Exam { Id = 1, Description = "Primer parcial" },
                new Exam { Id = 2, Description = "Segundo parcial" },
                new Exam { Id = 3, Description = "Parcial integrador" },
                new Exam { Id = 4, Description = "Trabajo práctico" },
                new Exam { Id = 5, Description = "Recuperatorio primer parcial" },
                new Exam { Id = 6, Description = "Recuperatorio segundo parcial" },
                new Exam { Id = 7, Description = "Recuperatorio integrador" },
                new Exam { Id = 8, Description = "Final" }
            };

            var terms = new List<Term>
            {
                new Term { Id = 1, Description = "Primer cuatrimestre" },
                new Term { Id = 2, Description = "Segundo cuatrimestre" },
                new Term { Id = 3, Description = "Curso de verano" }
            };

            await _context.Exam.AddRangeAsync(exams);
            await _context.Term.AddRangeAsync(terms);
            await _context.CourseStatus.AddRangeAsync(courseStatuses);
        }

        public async void Dispose()
        {
            _context.ChangeTracker.Clear();
            await _context.Database.RollbackTransactionAsync();
            await _context.ResetIdentity();
            await _context.DisposeAsync();
        }
    }
}
