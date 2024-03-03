import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { CityLille } from '../cities/CityLille';
import { type City } from '../cities/types/city';
import { type WeatherSettings } from '../modules/CityWeather/types/Weather';
import { type ThemeColor } from '../types/Theme';

interface State {
  theme: ThemeColor;
  currentCity: City;
  currentHomeViewDate: string;
  weatherSettings: WeatherSettings;
  refetchHome: boolean;
  refetchCityEventHome: boolean;
}

const initialState: State = {
  theme: 'light',
  currentCity: CityLille,
  currentHomeViewDate: moment.utc(1).toISOString(),
  weatherSettings: {
    startDailyHour: 7
  },
  refetchHome: false,
  refetchCityEventHome: false
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeColor>) => {
      state.theme = action.payload;
    },
    setCurrentCity: (state, action: PayloadAction<{ cityName: City }>) => {
      state.currentCity = action.payload.cityName;
    },
    setCurrentHomeViewDate: (state, action: PayloadAction<string>) => {
      state.currentHomeViewDate = action.payload;
    },
    setWeatherSettings: (state, action: PayloadAction<WeatherSettings>) => {
      state.weatherSettings = action.payload;
    },
    setRefetchHome: (state, action: PayloadAction<boolean>) => {
      state.refetchHome = action.payload;
    },
    setRefetchCityEventHome: (state, action: PayloadAction<boolean>) => {
      state.refetchCityEventHome = action.payload;
    }
  }
});

export const {
  setTheme,
  setCurrentCity,
  setCurrentHomeViewDate,
  setWeatherSettings,
  setRefetchHome,
  setRefetchCityEventHome
} = generalSlice.actions;

export default generalSlice.reducer;
