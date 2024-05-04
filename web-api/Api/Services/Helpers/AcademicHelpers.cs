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
                case SubjectStatus.Absence:
                    return "Ausente";
                default:
                    return "Desconocido";
            }
        }

        public static string GetExamDescription(ExamType exam)
        {
            switch (exam)
            {
                case ExamType.First:
                    return "Primer parcial";
                case ExamType.Second:
                    return "Segundo parcial";
                case ExamType.Integrator:
                    return "Integrador";
                case ExamType.FirstRecovery:
                    return "Recuperatorio primer parcial";
                case ExamType.SecondRecovery:
                    return "Recuperatorio segundo parcial";
                case ExamType.IntegratorRecovery:
                    return "Recuperatorio integrador";
                case ExamType.Final:
                    return "Final";
                case ExamType.Assignment:
                    return "Trabajo práctico";
                default:
                    return "Desconocido";

            }
        }

        public static byte GetStatusId(string status)
        {
            return status switch
            {
                "Pendiente" => (byte)SubjectStatus.Pending,
                "Aprobada" => (byte)SubjectStatus.Approved,
                "Cursando" => (byte)SubjectStatus.InProgress,
                "Desaprobada" => (byte)SubjectStatus.Failed,
                "Cursada" => (byte)SubjectStatus.Coursed,
                "Disponible" => (byte)SubjectStatus.Available,
                "No disponible" => (byte)SubjectStatus.NotAvailable,
                "Ausente" => (byte)SubjectStatus.Absence,
                _ => 0
            };
        }

        public static string GetTerm(byte id)
        {
            return id switch
            {
                1 => "Primer cuatrimestre",
                2 => "Segundo cuatrimestre",
                3 => "Curso de verano",
                _ => "Desconocido"
            };
        }
    }
}
