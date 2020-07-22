import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: false,
    hue: 'blueGrey',
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setHue: (state, action) => {
      state.hue = action.payload;
    },
  },
});

export const { toggleDarkMode, setHue } = themeSlice.actions;

export default themeSlice.reducer;
