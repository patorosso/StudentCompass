namespace StudentCompass.Data.Data.Models
{
    public class Course
    {
        public int Id { get; set; }
        public byte CareerPlanId { get; set; }
        public short SubjectCode { get; set; }
        public List<Exam>? Exams { get; set; }
        public string Status { get; set; } = null!;
        public byte? FinalGrade { get; set; }
        public string? Year { get; set; }
        public string? Term { get; set; }
    }
}
