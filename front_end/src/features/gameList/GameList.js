import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { updateGame, removeGame, selectGames } from './gamesSlice';
// import { selectIsAuthenticated } from "../authentication/authenticationSlice";
import client from '../../app/feather';
import { Game } from './Game';
import { GameSetup } from '../table/GameSetup';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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

  useEffect(() => {
    const updateGameListener = (game) => {
      console.log(game);
      dispatch(updateGame(game));
    };
    const removeGameListener = (game) => {
      console.log(game);
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
  }, [dispatch, gameService]);

  return (
    <Grid
      item
      container
      xs={12}
      md={9}
      spacing={4}
      alignItems="center"
      justify="center"
      className={classes.root}
    >
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
