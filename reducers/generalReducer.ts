import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { CityLille } from '../cities/CityLille';
import { type City } from '../cities/types/city';
import { type WeatherSettings } from '../features/Weather/types/Weather';

interface State {
  isDarkMode: boolean;
  currentCity: City;
  currentHomeViewDate: string;
  weatherSettings: WeatherSettings;
  isWeatherLoaded: boolean;
  refetchHome: boolean;
  refetchCityEventHome: boolean;
}

const initialState: State = {
  isDarkMode: false,
  currentCity: CityLille,
  currentHomeViewDate: moment.utc(1).toISOString(),
  weatherSettings: {
    startDailyHour: 7
  },
  isWeatherLoaded: false,
  refetchHome: false,
  refetchCityEventHome: false
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<{ cityName: City }>) => {
      state.currentCity = action.payload.cityName;
    },
    setCurrentHomeViewDate: (state, action: PayloadAction<string>) => {
      state.currentHomeViewDate = action.payload;
    },
    setWeatherSettings: (state, action: PayloadAction<WeatherSettings>) => {
      state.weatherSettings = action.payload;
    },
    setIsWeatherLoaded: (state, action: PayloadAction<boolean>) => {
      state.isWeatherLoaded = action.payload;
    },
    setRefetchHome: (state, action: PayloadAction<boolean>) => {
      state.refetchHome = action.payload;
    },
    setRefetchCityEventHome: (state, action: PayloadAction<boolean>) => {
      state.refetchCityEventHome = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    }
  }
});

export const {
  setCurrentCity,
  setCurrentHomeViewDate,
  setWeatherSettings,
  setIsWeatherLoaded,
  setRefetchHome,
  setRefetchCityEventHome,
  setIsDarkMode
} = generalSlice.actions;

export default generalSlice.reducer;
