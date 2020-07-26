import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ThemePicker } from '../themes/Themes';
import { ProfileMenu } from '../authentication/ProfileMenu';

export const Header = (props) => {
  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }));
  const theme = useTheme();
  const classes = useStyles(theme);
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6">
          Silver
        </Typography>
        <div className={classes.grow} />
        <ThemePicker />
        {isAuthenticated && <ProfileMenu />}
      </Toolbar>
    </AppBar>
  );
};
