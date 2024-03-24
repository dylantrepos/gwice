import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface State {
  eventCategory: number[];
}

const initialState: State = {
  eventCategory: []
};

const eventSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setEventCategory: (state, action: PayloadAction<number[]>) => {
      state.eventCategory = action.payload;
    }
  }
});

export const { setEventCategory } = eventSlice.actions;

export default eventSlice.reducer;
