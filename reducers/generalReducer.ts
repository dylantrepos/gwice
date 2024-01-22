import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityLille } from "../cities/CityLille";
import { City } from "../cities/types/city";
import { WeatherSettings } from "../types/Weather";
import { AppDispatch } from "../store/store";

type State = {
  currentCity: City;
  weatherSettings: WeatherSettings;
  refetchHome: boolean;
}

const initialState: State = {
  currentCity: CityLille,
  weatherSettings: {
    laps: '2',
    range: '12'
  },
  refetchHome: false
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<{cityName: City}>) => {
      state.currentCity = action.payload.cityName;
    },
    setWeatherSettings: (state, action: PayloadAction<WeatherSettings>) => {
      state.weatherSettings = action.payload;
    },
    setRefetchHome: (state, action: PayloadAction<boolean>) => {
      console.log('setRefetchHome :', action.payload);
      state.refetchHome = action.payload;
    }
  }
});

export const { 
  setCurrentCity,
  setWeatherSettings,
  setRefetchHome
} = generalSlice.actions;

export default generalSlice.reducer;