using StudentCompass.Data.Data.Models;

namespace StudentCompass.Data.Helpers
{
    public static class AcademicHelpers
    {
        public static string GetStatusDescription(byte? status)
        {
            switch (status)
            {
                case (byte)CourseStatus.Pending:
                    return "Pendiente";
                case (byte)CourseStatus.Approved:
                    return "Aprobada";
                case (byte)CourseStatus.InProgress:
                    return "Cursando";
                case (byte)CourseStatus.Failed:
                    return "Reprobada";
                case (byte)CourseStatus.Coursed:
                    return "Cursada";
                case (byte)CourseStatus.Available:
                    return "Disponible";
                case (byte)CourseStatus.NotAvailable:
                    return "No disponible";
                case (byte)CourseStatus.Absence:
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
                "Pendiente" => (byte)CourseStatus.Pending,
                "Aprobada" => (byte)CourseStatus.Approved,
                "Cursando" => (byte)CourseStatus.InProgress,
                "Desaprobada" => (byte)CourseStatus.Failed,
                "Cursada" => (byte)CourseStatus.Coursed,
                "Disponible" => (byte)CourseStatus.Available,
                "No disponible" => (byte)CourseStatus.NotAvailable,
                "Ausente" => (byte)CourseStatus.Absence,
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
