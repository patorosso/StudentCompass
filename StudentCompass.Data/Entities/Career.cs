using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentCompass.Data.Entities
{
    public class Career
    {
        [Key]
        public byte Id { get; set; }

        [Required]
        [MaxLength(60)]
        public string Description { get; set; } = null!;

        [Required]
        public byte DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        public Department Department { get; set; } = null!;
    }
}
