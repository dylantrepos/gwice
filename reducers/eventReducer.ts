import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";
import { PERIODS } from "../types/Date";

type State = {
  searchValue: string;
  isSearchInputFocused: boolean;
  periods: PERIODS[];
  currentPeriod: string;
  customPeriod?: {
    startDate: string;
    endDate: string;
  };
}

const initialState: State = {
  searchValue: '',
  isSearchInputFocused: false,
  periods: [],
  currentPeriod: PERIODS.ALWAYS,
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
    },
    setCurrentPeriod: (state, action: PayloadAction<string>) => {
      state.currentPeriod = action.payload;
    },
    setCustomPeriod: (state, action: PayloadAction<{startDate: string, endDate: string}>) => {
      console.log('action.payload', action.payload);
      state.customPeriod = action.payload;
    }
  }
});

export const { 
  setSearchValue,
  setIsSearchInputFocused,
  setPeriods,
  setCurrentPeriod,
  setCustomPeriod
} = eventSlice.actions;

export default eventSlice.reducer;