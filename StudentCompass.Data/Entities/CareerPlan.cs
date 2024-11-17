using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentCompass.Data.Entities
{
    public class CareerPlan
    {
        [Key]
        public byte Id { get; set; }

        [Required]
        [MaxLength(60)]
        public string Description { get; set; }

        [Required]
        public byte CareerId { get; set; }

        [ForeignKey("CareerId")]
        public Career Career { get; set; } = null!;
    }
}
