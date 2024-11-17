using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using StudentCompass.Data.Dtos;
using StudentCompass.Data.Entities;
using System.Text;

namespace StudentCompass.Data.Context
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        //public DbSet<User> User { get; set; }
        //public DbSet<Role> Role { get; set; }
        public DbSet<Exam> Exam { get; set; }
        public DbSet<Term> Term { get; set; }
        public DbSet<Career> Career { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<Student> Student { get; set; }
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
            modelBuilder.Entity<Subject>().HasKey(s => new { s.Code, s.CareerPlanId });
            modelBuilder.Entity<Course>().HasKey(c => c.Id);

            // Query DTO's
            modelBuilder.Entity<GetProgressOverviewDto>()
                        .HasNoKey();
            modelBuilder.Entity<GetProgressOverviewDto>()
                        .Property(e => e.Status)
                        .HasConversion<byte>();

            // Extra configurations

            modelBuilder.Entity<Course>()
                        .HasIndex(c => new { c.StudentId, c.SubjectCode, c.CareerPlanId, c.TermId, c.Year })
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
                .UseSqlServer("Server=PATRICIO-WINDOW;Database=test_studentcompass;User Id=sa;Password=adminCjs4life1@;Integrated Security=False;TrustServerCertificate=True")
                .Options;

            var context = new AppDbContext(options);
            context.EnsureMigrated();

            return context;
        }

        public static IDbContextFactory<AppDbContext> CreateFactory()
        {
            var connectionString = "Server=PATRICIO-WINDOW;Database=test_studentcompass;User Id=sa;Password=adminCjs4life1@;Integrated Security=False;TrustServerCertificate=True";
            
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(connectionString) 
                .Options;

            return new PooledDbContextFactory<AppDbContext>(options);
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
            StringBuilder command = new StringBuilder();

            command.Append("DBCC CHECKIDENT ('Course', RESEED, 0); ");
            command.Append("DBCC CHECKIDENT ('Student', RESEED, 0); ");

            await context.Database.ExecuteSqlRawAsync(command.ToString());
        }
    }
}