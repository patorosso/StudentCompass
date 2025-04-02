
namespace StudentCompass.Data.Dtos
{
    public class SubjectToUpdateDto
    {
        public short Code { get; set; }
        public int? CourseId { get; set; }
        public byte? FinalGrade { get; set; }
        public byte CareerPlanId { get; set; }
        public string Status { get; set; } = null!;
    }
}
