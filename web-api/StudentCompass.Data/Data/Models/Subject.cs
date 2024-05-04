namespace StudentCompass.Data.Data.Models
{

    public class Subject
    {
        public short Code { get; set; }
        public string Description { get; set; } = null!;
        public byte WeeklyHours { get; set; }
        public byte YearLevel { get; set; }
        public bool IsOptional { get; set; }
        public bool IsElective { get; set; }
        public bool IsAnnual { get; set; }
        public string Status { get; set; } = null!;
        public byte? FinalGrade { get; set; }
        public int? CourseId { get; set; }
        public byte CareerPlanId { get; set; }

    }

    public enum SubjectStatus
    {
        Pending,
        Approved,
        InProgress,
        Failed,
        Coursed,
        Available,
        NotAvailable,
        Absence
    }


}
