using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentCompass.Services.Helpers
{
    public class AuthException(string message) : Exception(message)
    {
    }


}
