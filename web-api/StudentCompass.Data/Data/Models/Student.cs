namespace StudentCompass.Data.Data.Models
{
    public class Student
    {
        public short Id { get; set; }
        public string Name { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string? Mail { get; set; }
        public bool IsActive { get; set; }

    }
}
