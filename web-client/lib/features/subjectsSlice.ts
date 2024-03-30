import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
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

// Add current subjects params
type AddCurrentSubjectsType = {
  student: string;
  subjects: Subject[];
};

// Add current subjects payload
type AddCurrentSubjectsPayload = {
  code: number;
  courseId: number;
};

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
      })
      .addCase(addCurrentSubjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCurrentSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        const payload = action.payload;

        state.subjectsList = state.subjectsList.map((subject) => {
          const payloadSubject = payload.find(
            (p: AddCurrentSubjectsPayload) => p.code === subject.code
          );
          return payloadSubject
            ? {
                ...subject,
                courseId: payloadSubject.courseId,
                status: "Cursando",
              }
            : subject;
        });
      })
      .addCase(addCurrentSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Async thunk
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async ({ student, career }: FetchSubjectsArgs) => {
    const response = await fetch(
      `https://localhost:7006/api/Dashboard?studentId=${student}&careerPlanId=${career}`
    );
    return response.json();
  }
);

// Async thunk
export const addCurrentSubjects = createAsyncThunk(
  "subjects/addCurrentSubjects",
  async ({ subjects, student }: AddCurrentSubjectsType) => {
    const response = await fetch(
      `https://localhost:7006/api/Dashboard/createInProgressCourse?studentId=${student}`,
      {
        method: "POST",
        body: JSON.stringify(subjects),
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.json();
  }
);

// Selectors
export const { setSubjects } = subjectsSlice.actions;
export const selectAllSubjects = (state: RootState) =>
  state.subjects.subjectsList;

export const selectAvailableSubjects = createSelector(
  [selectAllSubjects],
  (subjectsList) =>
    subjectsList.filter((subject) => subject.status === "Disponible")
);

export const selectInProgressSubjects = createSelector(
  [selectAllSubjects],
  (subjectsList) =>
    subjectsList.filter((subject) => subject.status === "Cursando")
);

export default subjectsSlice.reducer;
