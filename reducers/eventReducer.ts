import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

type State = {
  searchValue: string;
  isSearchInputFocused: boolean;
}

const initialState: State = {
  searchValue: '',
  isSearchInputFocused: false,
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
  }
});

export const { 
  setSearchValue,
  setIsSearchInputFocused
} = eventSlice.actions;

export default eventSlice.reducer;