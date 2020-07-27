import { createSlice } from '@reduxjs/toolkit';

export const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: {},
    players: {},
  },
  reducers: {
    loadGames: (state, action) => {
      state.games = action.payload.reduce((obj, game) => {
        obj[game.uuid] = game;
        return obj;
      }, {});
    },
    updateGame: (state, action) => {
      console.log('Start update game', action);
      state.games[action.payload.uuid] = action.payload;
      action.payload.players.forEach((p) => (state.players[p.uuid] = p));
      console.log('Finish update game');
    },
    updateGameAttribute: (state, action) => {
      state.games[action.payload.uuid][action.payload.attribute] =
        action.payload.value;
    },
    removeGame: (state, action) => {
      delete state.games[action.payload.uuid];
    },
    loadPlayers: (state, action) => {
      state.players = action.payload.reduce((obj, player) => {
        obj[player.uuid] = player;
        return obj;
      }, {});
    },
    updatePlayer: (state, action) => {
      state.players[action.payload.uuid] = action.payload;
      if (state.games[action.payload.gameUuid]) {
        const playerIndex = state.games[
          action.payload.gameUuid
        ].players.findIndex((p) => (p.uuid = action.payload.uuid));
        if (playerIndex) {
          state.games[action.payload.gameUuid].players[playerIndex] = {
            ...state.games[action.payload.gameUuid].players[playerIndex],
            ...action.payload,
          };
        } else {
          state.games[action.payload.gameUuid].players.push(action.payload);
        }
      } else {
        state.games[action.payload.gameUuid] = {
          ...action.payload.game,
          players: [action.payload],
        };
      }
    },
    removePlayer: (state, action) => {
      delete state.players[action.payload.uuid];
      state.games[action.payload.gameUuid].players = state.games[
        action.payload.gameUuid
      ].players.filter((p) => p.uuid !== action.payload.uuid);
    },
  },
});

export const {
  loadGames,
  updateGame,
  updateGameAttribute,
  removeGame,
  loadPlayers,
  updatePlayer,
  removePlayer,
} = gamesSlice.actions;

export const selectGameUuids = (state) => Object.keys(state.games.games);
export const selectGames = (state) => Object.values(state.games.games);
export const selectGame = (state, uuid) => state.games.games[uuid];

export default gamesSlice.reducer;
