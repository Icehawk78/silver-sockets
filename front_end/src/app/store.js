import { configureStore } from '@reduxjs/toolkit';
import lobbyReducer from '../features/lobby/lobbySlice';
import gamesReducer from '../features/gameList/gamesSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import themeReducer from '../features/themes/themeSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('redux.state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export default configureStore({
  reducer: {
    lobby: lobbyReducer,
    games: gamesReducer,
    authentication: authenticationReducer,
    theme: themeReducer,
  },
});
