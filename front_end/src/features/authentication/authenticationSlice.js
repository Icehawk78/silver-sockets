import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    currentUser: {},
  },
  reducers: {
    login: (state, action) => {
      console.log(state);
      console.log(action);
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.currentUser = {};
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export const selectCurrentUser = (state) => state.authentication.currentUser;
export const selectIsAuthenticated = (state) =>
  state.authentication.isAuthenticated;

export default authenticationSlice.reducer;
