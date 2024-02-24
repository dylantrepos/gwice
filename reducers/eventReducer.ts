import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";
import { PERIODS } from "../types/Date";

type State = {
  searchValue: string;
  isSearchInputFocused: boolean;
  periods: PERIODS[];
}

const initialState: State = {
  searchValue: '',
  isSearchInputFocused: false,
  periods: []
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setIsSearchInputFocused: (state, action: PayloadAction<boolean>) => {
      state.isSearchInputFocused = action.payload;
    },
    setPeriods: (state, action: PayloadAction<PERIODS[]>) => {
      state.periods = action.payload;
    }
  }
});

export const { 
  setSearchValue,
  setIsSearchInputFocused,
  setPeriods
} = eventSlice.actions;

export default eventSlice.reducer;