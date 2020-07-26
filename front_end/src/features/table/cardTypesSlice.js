import { createSlice } from '@reduxjs/toolkit';

export const setupItemsSlice = createSlice({
  name: 'setupItems',
  initialState: {
    cardTypes: [],
    silverTokens: [],
  },
  reducers: {
    loadCardTypes: (state, action) => {
      state.cardTypes = action.payload;
    },
    loadSilverTokens: (state, action) => {
      state.silverTokens = action.payload;
    },
  },
});

export const { loadCardTypes, loadSilverTokens } = setupItemsSlice.actions;

export const selectCardTypes = (state) => state.setupItems.cardTypes;
export const selectSilverTokens = (state) => state.setupItems.silverTokens;

export default setupItemsSlice.reducer;
