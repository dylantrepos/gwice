import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  name: string;
  email: string;
  language: string;
}

const initialState: State = {
  name: 'John Doe',
  email: 'john@doe.com',
  language: 'fr',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    }
  }
});

export const { 
  setLanguage
} = userSlice.actions;

export default userSlice.reducer;