import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityLille } from "../cities/CityLille";
import { City } from "../cities/types/city";
import { WeatherSettings } from "../types/Weather";
import { AppDispatch } from "../store/store";
import moment from "moment";
import { set } from "date-fns";

type State = {
  currentCity: City;
  currentHomeViewDate: string;
  weatherSettings: WeatherSettings;
  refetchHome: boolean;
  refetchCityEventHome: boolean;
  cityEventDateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

const initialState: State = {
  currentCity: CityLille,
  currentHomeViewDate: moment.utc(1).toISOString(),
  weatherSettings: {
    startDailyHour: 7,
  },
  refetchHome: false,
  refetchCityEventHome: false,
  cityEventDateRange: {
    startDate: moment.utc(1).toDate(),
    endDate: moment.utc(1).toDate()
  }
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<{cityName: City}>) => {
      state.currentCity = action.payload.cityName;
    },
    setCurrentHomeViewDate: (state, action: PayloadAction<string>) => {
      state.currentHomeViewDate = action.payload;
    },
    setWeatherSettings: (state, action: PayloadAction<WeatherSettings>) => {
      state.weatherSettings = action.payload;
    },
    setRefetchHome: (state, action: PayloadAction<boolean>) => {
      console.log('setRefetchHome :', action.payload);
      state.refetchHome = action.payload;
    },
    setRefetchCityEventHome: (state, action: PayloadAction<boolean>) => {
      console.log('setRefetchCityEventHome :', action.payload);
      state.refetchCityEventHome = action.payload;
    },
    setCityEventDateRange: (state, action: PayloadAction<{startDate: Date | null, endDate: Date | null}>) => {
      state.cityEventDateRange = action.payload;
    }
  }
});

export const { 
  setCurrentCity,
  setCurrentHomeViewDate,
  setWeatherSettings,
  setRefetchHome,
  setRefetchCityEventHome,
  setCityEventDateRange
} = generalSlice.actions;

export default generalSlice.reducer;