using Api.Dto;

namespace Api.Contracts
{
    public interface IStudentRepository
    {
        Task<IEnumerable<StudentDto>> GetStudents();
    }
}
