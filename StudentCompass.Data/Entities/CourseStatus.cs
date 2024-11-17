using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StudentCompass.Data.Entities
{
    public class CourseStatus
    {
        [Key]
        public byte Id { get; set; }

        [Required]
        [MaxLength(25)]
        public string Description { get; set; } = null!;
    }
}
