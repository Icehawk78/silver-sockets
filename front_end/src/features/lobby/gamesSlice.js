import { createSlice } from "@reduxjs/toolkit";

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: {},
    players: {}
  },
  reducers: {
    loadGames: (state, action) => {
      state.games = action.payload.reduce((obj, game) => {
        obj[game.uuid] = game;
        return obj;
      }, {});
    },
    updateGame: (state, action) => {
      state.games[action.payload.uuid] = action.payload;
    },
    removeGame: (state, action) => {
      delete state.games[action.payload.uuid];
    },
    loadPlayers: (state, action) => {
      state.players = action.payload.reduce((obj, player) => {
        obj[player.uuid] = player;
        return obj;
      }, {});
    }
  }
});

export const {
  loadGames,
  updateGame,
  removeGame,
  loadPlayers
} = gamesSlice.actions;

export const selectGameUuids = state => Object.keys(state.games.games);
export const selectGames = state => Object.values(state.games.games);
export const selectGame = (state, uuid) => state.games.games[uuid];

export default gamesSlice.reducer;
