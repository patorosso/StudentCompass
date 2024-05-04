namespace StudentCompass.Data.Data.Models
{
    public class Exam
    {
        public byte Grade { get; set; }
        public string Description { get; set; } = null!;
        public DateTime Date { get; set; }
    }

    public enum ExamType
    {
        First = 1,
        Second = 2,
        Integrator = 3,
        Assignment = 4,
        FirstRecovery = 5,
        SecondRecovery = 6,
        IntegratorRecovery = 7,
        Final = 8,

    }
}
