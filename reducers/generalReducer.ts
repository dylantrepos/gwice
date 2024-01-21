import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityLille } from "../cities/CityLille";
import { City } from "../cities/types/city";
import { WeatherSettings } from "../types/Weather";

type State = {
  currentCity: City;
  weatherSettings: WeatherSettings;
}

const initialState: State = {
  currentCity: CityLille,
  weatherSettings: {
    laps: '2',
    range: '12'
  }
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
    }
  }
})

export default generalSlice.reducer;

export const { 
  setCurrentCity,
  setWeatherSettings,
} = generalSlice.actions;

