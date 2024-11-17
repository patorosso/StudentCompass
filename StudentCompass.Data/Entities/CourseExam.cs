using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace StudentCompass.Data.Entities
{
    [PrimaryKey(nameof(CourseId), nameof(ExamId))]
    public class CourseExam
    {
        public int CourseId { get; set; }

        public byte ExamId { get; set; }

        [Required]
        public DateTime TakenOn { get; set; }

        [Range(0, 10)]
        public byte Grade { get; set; }

        [ForeignKey("CourseId")]
        public Course Course { get; set; } = null!;

        [ForeignKey("ExamId")]
        public Exam Exam { get; set; } = null!;
    }
}
