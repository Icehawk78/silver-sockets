import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';
import themeReducer from '../features/themes/themeSlice';
import lobbyReducer from '../features/lobby/lobbySlice';
import gamesReducer from '../features/gameList/gamesSlice';
import cardTypesReducer from '../features/table/cardTypesSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('redux.state');
    if (serializedState === null) {
      return undefined;
    }
    console.log(serializedState);
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    theme: themeReducer,
    lobby: lobbyReducer,
    games: gamesReducer,
    cardTypes: cardTypesReducer,
  },
  preloadedState: loadState(),
});
