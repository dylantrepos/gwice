import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityLille } from "../cities/CityLille";
import { City } from "../cities/types/city";
import { AppDispatch } from "../store/store";
import moment from "moment";
import { set } from "date-fns";
import { WeatherSettings } from "../modules/CityWeather/types/Weather";

type State = {
  searchValue: string;
}

const initialState: State = {
  searchValue: '',
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  }
});

export const { 
  setSearchValue,
} = eventSlice.actions;

export default eventSlice.reducer;