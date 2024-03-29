namespace Api.Data.Models
{
    public class Exam
    {
        public byte Grade { get; set; }
        public string Description { get; set; } = null!;
    }

    public enum ExamType
    {
        First = 1,
        Second = 2,
        Recovery = 3,
        Final = 4,
        Assignment = 5
    }
}
