using Api.Data.Models;

namespace Api.Services.Helpers
{
    public static class AcademicHelpers
    {
        public static string GetStatusDescription(SubjectStatus status)
        {
            switch (status)
            {
                case SubjectStatus.Pending:
                    return "Pendiente";
                case SubjectStatus.Approved:
                    return "Aprobada";
                case SubjectStatus.InProgress:
                    return "Cursando";
                case SubjectStatus.Failed:
                    return "Reprobada";
                case SubjectStatus.Coursed:
                    return "Cursada";
                case SubjectStatus.Available:
                    return "Disponible";
                case SubjectStatus.NotAvailable:
                    return "No disponible";
                default:
                    return "Desconocido";
            }
        }
    }
}
