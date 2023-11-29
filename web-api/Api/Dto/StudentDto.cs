namespace Api.Dto
{
    public class StudentDto
    {
        public string Name { get; set; } = null!;
        public string? Mail { get; set; }
        public bool IsActive { get; set; }
    }
}
