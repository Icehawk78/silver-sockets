import React from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  loginCard: {
    padding: theme.spacing(3),
  },
}));

export const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      direction="column"
      className={classes.root}
    >
      <Grid item xs={9} md={4}>
        <Card raised className={classes.loginCard}>
          <CardContent>
            <Typography>
              Welcome to Silver! To play, please log in below.
            </Typography>
          </CardContent>
          <CardActions>
            <a href={`${process.env.REACT_APP_BACK_END_URL}/oauth/google`}>
              <img src="/google_signin.png" alt="Log in with Google" />
            </a>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
