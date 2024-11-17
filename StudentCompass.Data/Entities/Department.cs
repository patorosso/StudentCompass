using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentCompass.Data.Entities
{
    public class Department
    {
        [Key]
        public byte Id { get; set; }

        [Required]
        [MaxLength(35)]
        public string Description { get; set; } = null!;

        public List<Career> Careers { get; set; } = new List<Career>();
    }

}
