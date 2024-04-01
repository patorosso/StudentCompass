namespace Api.Data.Dtos
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
}
