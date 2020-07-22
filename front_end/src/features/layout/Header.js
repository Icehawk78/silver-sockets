import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ThemePicker } from "../themes/Themes";
import { ProfileMenu } from "../authentication/ProfileMenu";

const useStyles = makeStyles((theme) => ({}));

export const Header = (props) => {
  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  }));
  const theme = useTheme();
  const classes = useStyles(theme);
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const dispatch = useDispatch();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" nowrap>
          Silver
        </Typography>
        <div className={classes.grow} />
        <ThemePicker />
        {isAuthenticated && <ProfileMenu />}
      </Toolbar>
    </AppBar>
  );
};
