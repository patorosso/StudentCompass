import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    // other reducers...
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
