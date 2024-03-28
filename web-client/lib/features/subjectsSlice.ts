import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Slice state type
interface SubjectsState {
  subjectsList: Subject[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

// Fetch subjects params
interface FetchSubjectsArgs {
  student: string | null;
  career: string | null;
}

// Initial state
const initialState: SubjectsState = {
  subjectsList: [],
  status: "idle",
  error: undefined,
};

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects: (state, action: PayloadAction<Subject[]>) => {
      state.subjectsList = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjectsList = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Async thunk
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async ({student, career} : FetchSubjectsArgs) => {
    const response = await fetch(
      `https://localhost:7006/api/Dashboard?studentId=${student}&careerPlanId=${career}`
    );
    return response.json();
  }
);

export const { setSubjects } = subjectsSlice.actions;

export const selectAllSubjects = (state: RootState) =>
  state.subjects.subjectsList;

export default subjectsSlice.reducer;
