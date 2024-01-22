import { configureStore } from "@reduxjs/toolkit";
import general from "../reducers/generalReducer";

export const store = configureStore({
  reducer: {
    general
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
