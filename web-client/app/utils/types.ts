interface Subject {
  code: number;
  description: string;
  finalGrade: number;
  weeklyHours: number;
  yearLevel: number;
  isOptional: boolean;
  isElective: boolean;
  isAnnual: boolean;
  isAvailable: boolean;
  status: string;
  exams: Exam[];
}

interface User {
  id: string;
  token: string;
  isLoaded: boolean;
}

type SubjectRowProps = {
  subjects: Subject[];
};

interface Exam {
  description: string;
  grade: number;
}
