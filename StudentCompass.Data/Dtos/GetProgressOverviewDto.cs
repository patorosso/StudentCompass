using StudentCompass.Data.Entities;
using StudentCompass.Data.Enums;

namespace StudentCompass.Data.Dtos
{
    public class GetProgressOverviewDto
    {
        public short Code { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsElective { get; set; }
        public bool IsAnnual { get; set; }
        public bool IsOptional { get; set; }
        public byte WeeklyHours { get; set; }
        public byte YearLevel { get; set; }
        public CourseStatusEnum Status { get; set; }
        public byte? FinalGrade { get; set; }
        public int? CourseId { get; set; }
        public List<Exam> Exams { get; set; } = [];
    }
}
