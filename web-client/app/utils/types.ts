interface Subject {
  code: number;
  description: string;
  finalGrade: number | null;
  weeklyHours: number;
  yearLevel: number;
  isOptional: boolean;
  isElective: boolean;
  isAnnual: boolean;
  isAvailable: boolean;
  status: string;
  exams: Exam[];
  courseId: number;
  careerPlanId: number;
}

interface User {
  id: string;
  token: string;
  isLoaded: boolean;
  preferences: Preferences;
}

interface Preferences {
  darkTheme: boolean;
  editStyle: "Fast" | "Detailed";
}

interface CorrelativesDict {
  [key: number]: number[];
}

type SubjectProps = {
  subjects: Subject[];
};

interface Exam {
  description: string;
  grade: number;
}

interface UpdateSubjectDto {
  code: number;
  finalGrade: number | null;
  courseId: number | null;
  status: string;
  careerPlanId: number;
}
