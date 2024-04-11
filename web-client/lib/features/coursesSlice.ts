import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { toast } from "react-toastify";

// Slice state type
interface CoursesState {
  coursesDict: CoursesDict;
  selectedCourse: Course | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

// Fetch correlatives params
interface GetCoursesArgs {
  subjectCode: number;
}

// Initial state
const initialState: CoursesState = {
  coursesDict: {},
  selectedCourse: null,
  status: "idle",
  error: undefined,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    updateGradeSelectedCourse: (state, action) => {
      if (state.selectedCourse) {
        state.selectedCourse = {
          ...state.selectedCourse,
          finalGrade: action.payload,
        };
      }
    },
    updateTermSelectedCourse: (state, action) => {
      if (state.selectedCourse) {
        state.selectedCourse = {
          ...state.selectedCourse,
          term: action.payload,
        };
      }
    },
    updateYearSelectedCourse: (state, action) => {
      if (state.selectedCourse) {
        state.selectedCourse = {
          ...state.selectedCourse,
          year: action.payload,
        };
      }
    },
    updateStatusSelectedCourse: (state, action) => {
      if (state.selectedCourse) {
        state.selectedCourse = {
          ...state.selectedCourse,
          status: action.payload,
          finalGrade:
            action.payload === "Cursando"
              ? null
              : state.selectedCourse.finalGrade,
        };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        const subjectCode = Number(Object.keys(action.payload)[0]); // cast to number because all keys are strings
        const courses = action.payload[subjectCode];
        state.coursesDict[subjectCode] = courses;

        if (courses.length > 0) state.selectedCourse = courses[0];
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Async thunk
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async ({ subjectCode }: GetCoursesArgs) => {
    const response = await fetch(
      `https://localhost:7006/api/Dashboard/getCourses?careerPlanId=1&studentId=1&subjectCode=${subjectCode}`
    );
    return response.json();
  }
);

export const {
  setSelectedCourse,
  updateGradeSelectedCourse,
  updateStatusSelectedCourse,
  updateTermSelectedCourse,
  updateYearSelectedCourse,
} = coursesSlice.actions;

// Selectors

export const selectCourses = (state: RootState) => state.courses.coursesDict;
export const selectSelectedCourse = (state: RootState) =>
  state.courses.selectedCourse;

export default coursesSlice.reducer;
