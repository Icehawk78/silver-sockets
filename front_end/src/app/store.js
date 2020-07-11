import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import lobbyReducer from "../features/lobby/lobbySlice";
import gamesReducer from "../features/lobby/gamesSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    lobby: lobbyReducer,
    games: gamesReducer,
    authentication: authenticationReducer
  }
});
