using StudentCompass.Data.Data.Dtos;

namespace StudentCompass.Data.Contracts
{
    public interface IStudentRepository
    {
        Task<IEnumerable<StudentDto>> GetStudents();
    }
}
