import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '../authentication/authenticationSlice';
import { updateGame } from '../gameList/gamesSlice';
import { loadCardTypes, loadSilverTokens } from './cardTypesSlice';
import client from '../../app/feather';
import { NUMBERS_COUNT } from './games.const';
import { Grid, Typography, Card, Button } from '@material-ui/core';
import {
  updateGameListeners,
  updatePlayerListeners,
} from '../gameList/game.hooks';
// import styles from "./Lobby.module.css";

export const GameSetup = (props) => {
  const { gameUuid } = props;
  const game = useSelector((state) => state.games.games[gameUuid]);
  const currentPlayer = useSelector(
    (state) => state.authentication.currentUser.player
  );
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const gameService = client.service('games');
  const playerService = client.service('players');
  const cardTypeService = client.service('cardTypes');
  const gameSilverTokenService = client.service('gameSilverTokens');

  useEffect(() => {
    const initialLoad = async () => {
      const loadCalls = [
        gameService.get(gameUuid),
        cardTypeService.find(),
        gameSilverTokenService.find(),
      ];
      Promise.all(loadCalls).then(
        ([gameResult, cardTypesResults, gamesSilverTokensResults]) => {
          dispatch(updateGame(gameResult));
          dispatch(loadCardTypes(cardTypesResults.data));
          dispatch(loadSilverTokens(gamesSilverTokensResults.data));
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
  }, [
    cardTypeService,
    gameService,
    gameSilverTokenService,
    isAuthenticated,
    dispatch,
    gameUuid,
  ]);

  useEffect(updateGameListeners(dispatch), [dispatch]);
  useEffect(updatePlayerListeners(dispatch), [dispatch]);

  return game ? (
    <Grid container alignItems="center" justify="center">
      <Card>
        <Grid item xs={6}>
          <Typography>Cards go from 0 to {NUMBERS_COUNT}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Game has {game.cards.length} cards.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => playerService.remove(currentPlayer.uuid)}>
            Leave Game
          </Button>
        </Grid>
      </Card>
    </Grid>
  ) : (
    <Grid container />
  );
};
