
namespace StudentCompass.Data.Dtos
{
    public class CourseWithExamsDto
    { 
        public int Id { get; set; }
        public short SubjectCode { get; set; }
        public byte CareerPlanId { get; set; }
        public byte TermId { get; set; }
        public byte StatusId { get; set; }
        public byte Year { get; set; }
        public byte? FinalGrade { get; set; }
        public int ExamId { get; set; }
        public byte? Grade { get; set; }
        public DateTime? TakenOn { get; set; }
    }
}
