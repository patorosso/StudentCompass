using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace StudentCompass.Data.Entities
{
    [PrimaryKey(nameof(SubjectCode) , nameof(CorrelativeCode), nameof(SubjectCareerPlanId), nameof(CorrelativeCareerPlanId))]
    public class Correlative
    {
        public short SubjectCode { get; set; }
        public short CorrelativeCode { get; set; }
        public byte SubjectCareerPlanId { get; set; }
        public byte CorrelativeCareerPlanId { get; set; }

    }
}
