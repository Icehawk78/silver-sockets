import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMessages } from './lobby.slice';
import { loadGames, loadPlayers } from '../gameList/games.slice';
import { selectIsAuthenticated } from '../authentication/authentication.slice';
import client from '../../app/feather';
import { Grid } from '@material-ui/core';
import { GameList } from '../gameList/GameList';
import { MessageList } from './MessageList';

export function Lobby() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const messageService = client.service('messages');
  const gameService = client.service('games');
  const playerService = client.service('players');

  useEffect(() => {
    const initialLoad = async () => {
      const loadCalls = [
        messageService.find(),
        gameService.find(),
        playerService.find(),
      ];
      Promise.all(loadCalls).then(
        ([messagesResults, gamesResults, playerResults]) => {
          console.log('Messages loaded: ', messagesResults.data);
          dispatch(loadMessages(messagesResults.data));
          console.log('Games loaded: ', gamesResults.data);
          dispatch(loadGames(gamesResults.data));
          console.log('Players loaded: ', playerResults.data);
          dispatch(loadPlayers(playerResults.data));
        }
      );
    };

    if (isAuthenticated) {
      initialLoad();
      return;
    }
    client.once('authenticated', initialLoad);
    return () => {
      client.removeListener('authenticated', initialLoad);
    };
  }, [dispatch, gameService, isAuthenticated, messageService, playerService]);

  return (
    <Grid container alignItems="center" justify="center">
      <GameList />
      <MessageList />
    </Grid>
  );
}
