namespace StudentCompass.Data.Data.Dtos
{
    public class SubjectDto
    {
        public int CourseId { get; set; }
        public short Code { get; set; }
    }

    public class CorrelativeDto
    {
        public short Code { get; set; }
        public List<short> Correlatives { get; set; } = new();
    }

    public class UpdateSubjectDto
    {
        public short Code { get; set; }
        public int? CourseId { get; set; }
        public string Status { get; set; } = null!;
        public byte CareerPlanId { get; set; }
        public byte? FinalGrade { get; set; }

    }
}
