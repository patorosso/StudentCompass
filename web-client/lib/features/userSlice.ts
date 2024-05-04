import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Slice state type
interface UserState {
  user: User;
}

// Initial state of user
const initialState: UserState = {
  user: {
    id: "",
    token: "",
    isLoaded: false,
    preferences: {
      darkTheme: false,
      editStyle: "Fast",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    setEditStyle: (state, action: PayloadAction<"Fast" | "Detailed">) => {
      state.user.preferences.editStyle = action.payload;
    },
    // other reducers...
  },
});

export const { setUser, setEditStyle } = userSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectPreferences = (state: RootState) =>
  state.user.user.preferences;
export const selectEditStyle = (state: RootState) =>
  state.user.user.preferences.editStyle;

export default userSlice.reducer;
