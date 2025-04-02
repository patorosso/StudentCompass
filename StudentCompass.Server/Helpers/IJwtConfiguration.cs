namespace StudentCompass.Server.Helpers
{
    public interface IJwtConfiguration
    {
        byte[] Key { get; }
        string Issuer { get; }
        string? Audience { get; }
        double Lifetime { get; }
    }
}
