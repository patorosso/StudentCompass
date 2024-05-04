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

interface Course {
  id: number | null;
  subjectCode: number;
  careerPlanId: number;
  year: string | null;
  term: string | null;
  exams: Exam[];
  finalGrade: number | null;
  status: string | null;
}

interface CoursesDict {
  [key: number]: Course[];
}

type SubjectProps = {
  subjects: Subject[];
};

interface Exam {
  description: string;
  grade: number;
  date: Date;
}

interface UpdateSubjectDto {
  code: number;
  finalGrade: number | null;
  courseId: number | null;
  status: string;
  careerPlanId: number;
}
