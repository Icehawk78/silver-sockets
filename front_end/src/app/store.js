import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authentication.slice';
import themeReducer from '../features/themes/theme.slice';
import lobbyReducer from '../features/lobby/lobby.slice';
import gamesReducer from '../features/gameList/games.slice';
import cardTypesReducer from '../features/table/cardTypes.slice';

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
