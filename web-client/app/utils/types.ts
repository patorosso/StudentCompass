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
  courseId: number;
  careerId: number;
}

interface User {
  id: string;
  token: string;
  isLoaded: boolean;
}

type SubjectProps = {
  subjects: Subject[];
};

interface Exam {
  description: string;
  grade: number;
}
