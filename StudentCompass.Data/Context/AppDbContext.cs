using System.Text;
using StudentCompass.Data.Dtos;
using StudentCompass.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace StudentCompass.Data.Context
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        //public DbSet<Role> Role { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Exam> Exam { get; set; }
        public DbSet<Term> Term { get; set; }
        public DbSet<Career> Career { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<Enrolled> Enrolled { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<CourseExam> CourseExam { get; set; }
        public DbSet<CareerPlan> CareerPlan { get; set; }
        public DbSet<Correlative> Correlative { get; set; }
        public DbSet<CourseStatus> CourseStatus { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Keys
            modelBuilder.Entity<Career>().HasKey(s => s.Id);
            modelBuilder.Entity<Course>().HasKey(c => c.Id);
            modelBuilder.Entity<Subject>().HasKey(s => new { s.Code, s.CareerPlanId });

            // Query DTO's
            modelBuilder.Entity<GetProgressOverviewDto>()
                        .HasNoKey();
            modelBuilder.Entity<SubjectDto>()
                        .HasNoKey();
            modelBuilder.Entity<CourseWithExamsDto>()
                        .HasNoKey();

            // Extra configurations
            modelBuilder.Entity<GetProgressOverviewDto>()
                        .Property(e => e.Status)
                        .HasConversion<byte>();

            modelBuilder.Entity<Course>()
                        .HasIndex(c => new { c.UserId, c.SubjectCode, c.CareerPlanId, c.TermId, c.Year })
                        .IsUnique();

            modelBuilder.Entity<Course>()
                        .HasOne(c => c.Subject)
                        .WithMany(s => s.Courses)
                        .HasForeignKey(c => new { c.SubjectCode, c.CareerPlanId });

            //modelBuilder.Entity<Correlative>()
            //            .HasOne(c => c.Subject)
            //            .WithMany()
            //            .HasForeignKey(c => new { c.SubjectCode, c.SubjectCareerPlanId })
            //            .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Correlative>()
            //            .HasOne(c => c.CorrelativeSubject)
            //            .WithMany()
            //            .HasForeignKey(c => new { c.CorrelativeCode, c.CorrelativeCareerPlanId })
            //            .OnDelete(DeleteBehavior.Restrict);
        }

        public static AppDbContext CreateAppDbContext(string connectionString)
        {
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseSqlServer(connectionString);
            return new AppDbContext(builder.Options);
        }

        public static AppDbContext CreateTestAppDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer("Server=PATRICIO-WINDOW;Database=TestDbStudentCompass;Integrated Security=True;TrustServerCertificate=True")
                .Options;

            var context = new AppDbContext(options);
            context.EnsureMigrated();

            return context;
        }

        public void EnsureMigrated()
        {
            var pendingMigrations = Database.GetPendingMigrations();
            if (pendingMigrations.Any()) Database.Migrate();
        }

    }

    public static class DbContextExtensions
    {
        public static async Task ResetIdentity(this DbContext context)
        {
            StringBuilder command = new();

            command.Append("DBCC CHECKIDENT ('Course', RESEED, 0); ");
            command.Append("DBCC CHECKIDENT ('User', RESEED, 0); ");

            await context.Database.ExecuteSqlRawAsync(command.ToString());
        }
    }
}