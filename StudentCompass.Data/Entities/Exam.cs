using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StudentCompass.Data.Entities
{
    public class Exam
    {
        [Key]
        public byte Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Description { get; set; } = null!;
    }

    public enum ExamType // thinking about 
    {
        First = 1,
        Second = 2,
        Integrator = 3,
        Assignment = 4,
        FirstRecovery = 5,
        SecondRecovery = 6,
        IntegratorRecovery = 7,
        Final = 8,

    }
}
