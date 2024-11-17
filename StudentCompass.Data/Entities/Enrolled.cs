using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace StudentCompass.Data.Entities
{
    [PrimaryKey(nameof(StudentId), nameof(CareerPlanId))]
    public class Enrolled
    {
        public short StudentId { get; set; }

        public byte CareerPlanId { get; set; }

        [Required]
        public short EnrollmentYear { get; set; }

        [ForeignKey("StudentId")]
        public Student Student { get; set; } = null!;

        [ForeignKey("CareerPlanId")]
        public CareerPlan CareerPlan { get; set; } = null!;
    }

}
