using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StudentCompass.Data.Entities
{
    public class Term
    {
        [Key]
        public byte Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Description { get; set; } = null!;
    }
}
