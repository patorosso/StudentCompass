namespace StudentCompass.Data.Data.Models
{

    public class Subject
    {
        public short Code { get; set; }
        public string Description { get; set; } = null!;
        public byte CareerPlanId { get; set; }
        public byte WeeklyHours { get; set; }
        public byte YearLevel { get; set; }
        public bool IsOptional { get; set; }
        public bool IsElective { get; set; }
        public bool IsAnnual { get; set; }
    }

    public class Course
    {
        public int Id { get; set; }
        public byte CareerPlanId { get; set; }
        public short SubjectCode { get; set; }
        public List<Exam>? Exams { get; set; }
        public byte StatusId { get; set; }
        public byte? FinalGrade { get; set; }
        public string? Year { get; set; }
        public string? Term { get; set; }
    }

    public class SubjectCourse
    {
        public short Code { get; set; }
        public string Description { get; set; } = null!;
        public byte WeeklyHours { get; set; }
        public byte YearLevel { get; set; }
        public bool IsOptional { get; set; }
        public bool IsElective { get; set; }
        public bool IsAnnual { get; set; }
        public byte? StatusId { get; set; }
        public byte? FinalGrade { get; set; }
        public int? CourseId { get; set; }
        public byte CareerPlanId { get; set; }
    }

}
