import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "../reducers/generalReducer";
import eventReducer from "../reducers/eventReducer";

export const store = configureStore({
  reducer: {
    generalReducer,
    eventReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
