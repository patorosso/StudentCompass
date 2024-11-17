using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentCompass.Services
{
    internal class StoreProcedure
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
    }
}
