import React from "react";
import { useDispatch } from "react-redux";
import { updateGameAttribute } from "./gamesSlice";
import {
  Grid,
  ButtonGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gameCard: {
    padding: theme.spacing(1),
  },
  startedGameCard: {},
}));

export const Game = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { game, setCurrent } = props;
  const dispatch = useDispatch();

  return (
    <Grid item xs={4}>
      <Card
        raised
        className={clsx(classes.gameCard, {
          [classes.startedGameCard]: game.isStarted,
        })}
      >
        <CardContent>
          <Typography>
            Players: {game.players.map((p) => p.user.displayName)}
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup variant="contained">
            <Button
              onClick={() => {
                console.log(`Tried to join ${game.uuid}`);
                setCurrent(game.uuid);
              }}
            >
              Join
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  updateGameAttribute({
                    uuid: game.uuid,
                    attribute: "isStarted",
                    value: !game.isStarted,
                  })
                );
                console.log(`Tried to remove ${game.uuid}`);
              }}
            >
              Remove
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </Grid>
  );
};
