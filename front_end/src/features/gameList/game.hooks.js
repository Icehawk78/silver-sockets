import {
  updateGame,
  removeGame,
  updatePlayer,
  removePlayer,
} from './games.slice';
import client from '../../app/feather';

export const updateGameListeners = (dispatch) => () => {
  const gameService = client.service('games');
  const updateGameListener = (game) => {
    dispatch(updateGame(game));
  };
  const removeGameListener = (game) => {
    dispatch(removeGame(game));
  };

  gameService.on('created', updateGameListener);
  gameService.on('updated', updateGameListener);
  gameService.on('removed', removeGameListener);
  return () => {
    gameService.removeListener('created', updateGameListener);
    gameService.removeListener('updated', updateGameListener);
    gameService.removeListener('removed', removeGameListener);
  };
};

export const updatePlayerListeners = (dispatch) => () => {
  const playerService = client.service('players');
  const updatePlayerListener = (player) => {
    dispatch(updatePlayer(player));
  };
  const removePlayerListener = (player) => {
    dispatch(removePlayer(player));
  };

  playerService.on('created', updatePlayerListener);
  playerService.on('updated', updatePlayerListener);
  playerService.on('removed', removePlayerListener);
  return () => {
    playerService.removeListener('created', updatePlayerListener);
    playerService.removeListener('updated', updatePlayerListener);
    playerService.removeListener('removed', removePlayerListener);
  };
};
