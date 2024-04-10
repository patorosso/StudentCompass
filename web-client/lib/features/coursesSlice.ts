import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { toast } from "react-toastify";

// Slice state type
interface CoursesState {
  coursesList: Course[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

// // Fetch correlatives params
// interface GetCorrelativesArgs {
//   career: string | null;
// }

// Initial state
const initialState: CoursesState = {
  coursesList: [],
  status: "idle",
  error: undefined,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coursesList = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Async thunk
export const getCourses = createAsyncThunk(
  "correlatives/getCorrelatives",
  async () => {
    const response = await fetch(
      `https://localhost:7006/api/Dashboard/getCourses?careerPlanId=1&studentId=1`
    );
    return response.json();
  }
);

// Selectors

export const selectCourses = (state: RootState) => state.courses.coursesList;
export default coursesSlice.reducer;
