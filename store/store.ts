import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../reducers/eventReducer';
import generalReducer from '../reducers/generalReducer';

export const store = configureStore({
  reducer: {
    generalReducer,
    eventReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
