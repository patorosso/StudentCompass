using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace StudentCompass.Data.Entities
{
    [PrimaryKey(nameof(UserId), nameof(CareerPlanId))]
    public class Enrolled
    {
        public short UserId { get; set; }

        public byte CareerPlanId { get; set; }

        [Required]
        public short EnrollmentYear { get; set; }

        [ForeignKey("UserId")]
        public User User{ get; set; } = null!;

        [ForeignKey("CareerPlanId")]
        public CareerPlan CareerPlan { get; set; } = null!;
    }

}
