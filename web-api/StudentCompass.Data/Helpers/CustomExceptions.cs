namespace StudentCompass.Data.Helpers
{
    public class SqlConnectionException : Exception
    {
        public SqlConnectionException(string message) : base(message)
        {
        }
    }
}
