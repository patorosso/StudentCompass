import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import subjectsReducer from "./features/subjectsSlice";
import correlativesReducer from "./features/correlativesSlice";
import coursesReducer from "./features/coursesSlice";

export const makeStore = () => {
  return configureStore({
    devTools: true,

    reducer: {
      user: userReducer,
      subjects: subjectsReducer,
      correlatives: correlativesReducer,
      courses: coursesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
