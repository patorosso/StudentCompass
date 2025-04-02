using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace StudentCompass.Data.Entities
{
    [PrimaryKey(nameof(Code), nameof(CareerPlanId))]
    public class Subject
    {
        public short Code { get; set; }

        public byte CareerPlanId { get; set; }

        [Required]
        [MaxLength(60)]
        public string Description { get; set; } = null!;

        [Required]
        public byte WeeklyHours { get; set; }

        [Required]
        public byte YearLevel { get; set; }

        [Required]
        public bool IsOptional { get; set; }

        [Required]
        public bool IsElective { get; set; }

        [Required]
        public bool IsAnnual { get; set; }

        [ForeignKey("CareerPlanId")]
        public CareerPlan CareerPlan { get; set; } = null!;
        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
