﻿using Api.Data.Dtos;
using Api.Data.Models;

namespace Api.Services.Contracts
{
    public interface IAcademicRepository
    {
        Task<IEnumerable<Subject>> GetProgressOverview(short studentId, byte careerPlanId);
        Task SubjectToInProgress(int? courseId);
        Task<Dictionary<short, List<short>>> GetCorrelatives(byte careerPlanId);
        Task<IEnumerable<Subject>> UpdateSubjects(List<UpdateSubjectDto> subjectsToUpdate, short studentId, byte careerPlanId);
        Task<IEnumerable<SubjectDto>> CreateInProgressCourse(List<Subject> subjects, short studentId);
    }
}
