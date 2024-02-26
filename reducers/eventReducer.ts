import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";
import { PERIODS } from "../types/Date";
import moment from "moment";

type State = {
  searchValue: string;
  isSearchInputFocused: boolean;
  periods: PERIODS[];
  currentPeriod: string;
  customPeriod?: {
    startDate: string;
    endDate: string;
  };
  startDate: string;
  endDate: string;
}

const initialState: State = {
  searchValue: '',
  isSearchInputFocused: false,
  periods: [],
  currentPeriod: PERIODS.ALWAYS,
  startDate: moment().add(1, 'hours').toISOString(),
  endDate: moment().add(1, 'hours').add(10, 'year').endOf('day').toISOString(),
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
      state.customPeriod = action.payload;
    },
    setStartDatePeriod: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDatePeriod: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
  }
});

export const { 
  setSearchValue,
  setIsSearchInputFocused,
  setPeriods,
  setCurrentPeriod,
  setCustomPeriod,
  setStartDatePeriod,
  setEndDatePeriod,
} = eventSlice.actions;

export default eventSlice.reducer;