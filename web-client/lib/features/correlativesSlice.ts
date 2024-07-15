import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { toast } from "react-toastify";

// Slice state type
interface CorrelativesState {
  correlativesList: CorrelativesDict | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

// Fetch correlatives params
interface GetCorrelativesArgs {
  career: string | null;
}

// Initial state
const initialState: CorrelativesState = {
  correlativesList: null,
  status: "idle",
  error: undefined,
};

export const correlativesSlice = createSlice({
  name: "correlatives",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCorrelatives.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCorrelatives.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.correlativesList = action.payload;
      })
      .addCase(getCorrelatives.rejected, (state, action) => {
        state.status = "failed";
        toast.error("Error inesperado." + action.error.message);
        state.error = action.error.message;
      });
  },
});

// Async thunk
export const getCorrelatives = createAsyncThunk(
  "correlatives/getCorrelatives",
  async ({ career }: GetCorrelativesArgs) => {
    const response = await fetch(
      `https://localhost:7006/api/dashboard/progress/getCorrelatives?careerPlanId=${career}`
    );
    return response.json();
  }
);

// Selectors
export const selectAllCorrelatives = (state: RootState) =>
  state.correlatives.correlativesList;

export default correlativesSlice.reducer;
