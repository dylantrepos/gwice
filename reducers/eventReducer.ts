import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { PERIODS } from '../types/Date';

interface State {
  searchValue: string;
  searchValueHistory: string[];
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
  searchValueHistory: [],
  isSearchInputFocused: false,
  periods: [],
  currentPeriod: PERIODS.ALWAYS,
  startDate: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
  endDate: moment().add(10, 'year').endOf('day').format('YYYY-MM-DDTHH:mm:ss')
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSearchValueHistory: (state, action: PayloadAction<string[]>) => {
      state.searchValueHistory = action.payload;
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
    setCustomPeriod: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.customPeriod = action.payload;
    },
    setStartDatePeriod: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDatePeriod: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    }
  }
});

export const {
  setSearchValue,
  setSearchValueHistory,
  setIsSearchInputFocused,
  setPeriods,
  setCurrentPeriod,
  setCustomPeriod,
  setStartDatePeriod,
  setEndDatePeriod
} = eventSlice.actions;

export default eventSlice.reducer;
