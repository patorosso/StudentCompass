using System.Text;

namespace StudentCompass.Services
{
    internal class StoredProcedure
    {
        public static string GetProgressOverview(params object[] parameters)
        {
            var name = "GetProgressOverview";
            var sb = new StringBuilder();
            sb.Append($"EXEC {name} ");
            for (int i = 0; i < parameters.Length; i += 2)
            {
                sb.Append($"@{parameters[i]} = {parameters[i + 1]}, ");
            }
            return sb.ToString().TrimEnd(' ', ',');
        }  

        public static string UpdateSubjects(params object[] parameters)
        {
            var name = "UpdateSubjects";
            var sb = new StringBuilder();
            sb.Append($"EXEC {name} ");
            for (int i = 0; i < parameters.Length; i += 2)
            {
                sb.Append($"@{parameters[i]} = {parameters[i + 1]}, ");
            }
            return sb.ToString().TrimEnd(' ', ',');
        }

        public static string CourseToAttending(params object[] parameters)
        {
            var name = "CourseToAttending";
            var sb = new StringBuilder();
            sb.Append($"EXEC {name} ");
            for (int i = 0; i < parameters.Length; i += 2)
            {
                sb.Append($"@{parameters[i]} = {parameters[i + 1]}, ");
            }
            return sb.ToString().TrimEnd(' ', ',');
        }

        public static string CreateAttendingCourse(params object[] parameters)
        {
            var name = "CreateAttendingCourse";
            var sb = new StringBuilder();
            sb.Append($"EXEC {name} ");
            for (int i = 0; i < parameters.Length; i += 2)
            {
                sb.Append($"@{parameters[i]} = {parameters[i + 1]}, ");
            }
            return sb.ToString().TrimEnd(' ', ',');
        }
    }
}
