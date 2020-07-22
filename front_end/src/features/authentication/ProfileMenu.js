import React from "react";
import { AccountCircle } from "@material-ui/icons";
import {
  IconButton,
  Typography,
  Popover,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import client from "../../app/feather";

export const ProfileMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const useStyles = makeStyles((theme) => ({
    palette: {
      padding: theme.spacing(2),
    },
  }));
  const theme = useTheme();
  const classes = useStyles(theme);
  const currentUser = useSelector((state) => state.authentication.currentUser);

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Card className={classes.palette}>
          <CardContent>
            <Typography>
              Logged in as: <b>{currentUser.displayName}</b>
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => client.logout()}>Logout</Button>
          </CardActions>
        </Card>
      </Popover>
    </React.Fragment>
  );
};
