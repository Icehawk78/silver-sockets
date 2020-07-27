import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { selectGames } from './games.slice';
// import { selectIsAuthenticated } from "../authentication/authenticationSlice";
import client from '../../app/feather';
import { Game } from './Game';
import { GameSetup } from '../table/GameSetup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { updatePlayerListeners, updateGameListeners } from './game.hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

export function GameList() {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const [currentGameUuid, setCurrentGameUuid] = useState(null);
  const games = useSelector(selectGames);
  const dispatch = useDispatch();
  const gameService = client.service('games');
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(updateGameListeners(dispatch), [dispatch]);
  useEffect(updatePlayerListeners(dispatch), [dispatch]);

  return (
    <Grid item container xs={12} md={9} spacing={4} className={classes.root}>
      <Grid item xs={12}>
        <Button onClick={() => gameService.create({})}>Create Game</Button>
      </Grid>
      {games.map((game) => (
        <Game game={game} setCurrent={setCurrentGameUuid} key={game.uuid} />
      ))}
      {currentGameUuid != null && <GameSetup gameUuid={currentGameUuid} />}
    </Grid>
  );
}
