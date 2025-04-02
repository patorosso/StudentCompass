using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StudentCompass.Data.Entities
{

    public class Course
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public short UserId { get; set; }

        [Required]
        public short SubjectCode { get; set; }

        [Required]
        public byte CareerPlanId { get; set; }

        public byte? TermId { get; set; }

        [Required]
        public byte StatusId { get; set; }

        public short? Year { get; set; }

        [Range(1, 10)]
        public byte? FinalGrade { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [ForeignKey("SubjectCode, CareerPlanId")]
        public Subject Subject { get; set; } = null!;

        [ForeignKey("TermId")]
        public Term? Term { get; set; }

        [ForeignKey("StatusId")]
        public CourseStatus CourseStatus { get; set; } = null!;
    }
}
