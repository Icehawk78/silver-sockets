import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

export const Login = () => {
  const theme = useTheme();
  return (
    <Box
      clone
      mx="auto"
      p={10}
      bgcolor={theme.palette.background.paper}
      color={theme.palette.text.primary}
    >
      <Card>
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
    </Box>
  );
};
