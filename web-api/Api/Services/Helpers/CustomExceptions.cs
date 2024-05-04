namespace Api.Services.Helpers
{
    public class SqlConnectionException : Exception
    {
        public SqlConnectionException(string message) : base(message)
        {
        }
    }
}
