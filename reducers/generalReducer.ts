import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityLille } from "../cities/CityLille";
import { City } from "../cities/types/city";

type State = {
  currentCity: City;
}

const initialState: State = {
  currentCity: CityLille,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<{cityName: City}>) => {
      state.currentCity = action.payload.cityName;
    },
  }
})

export default generalSlice.reducer;

export const { 
  setCurrentCity,
} = generalSlice.actions;

