using Api.Data.Dtos;

namespace Api.Services.Contracts
{
    public interface IStudentRepository
    {
        Task<IEnumerable<StudentDto>> GetStudents();
    }
}
