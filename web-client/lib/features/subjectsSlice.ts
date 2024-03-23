import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Slice state type
interface SubjectsState {
  subjectsList: Subject[];
}

// Initial state
const initialState: SubjectsState = {
  subjectsList: [],
};

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects: (state, action: PayloadAction<Subject[]>) => {
      state.subjectsList = action.payload;
    },
    // other reducers...
  },
});

export const { setSubjects } = subjectsSlice.actions;

export default subjectsSlice.reducer;
