import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "../reducers/generalReducer";
import eventReducer from "../reducers/eventReducer";
import userReducer from "../reducers/userReducer";

export const store = configureStore({
  reducer: {
    generalReducer,
    eventReducer,
    userReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
