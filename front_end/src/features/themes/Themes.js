import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  blueGrey,
  cyan,
  red,
  blue,
  teal,
  indigo,
} from '@material-ui/core/colors';
import { Palette } from '@material-ui/icons';
import {
  IconButton,
  Typography,
  Popover,
  Grid,
  Paper,
  Switch,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { toggleDarkMode, setHue } from './themeSlice';
import { useSelector, useDispatch } from 'react-redux';

const colorMap = {
  blueGrey: blueGrey,
  cyan: cyan,
  red: red,
  blue: blue,
  teal: teal,
  indigo: indigo,
};
export const getTheme = (color, darkMode) => {
  return createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? colorMap[color][900] : colorMap[color][100],
      },
      contrastThreshold: 5,
      tonalOffset: 0.1,
    },
  });
};

export const ThemePicker = (props) => {
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
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const hue = useSelector((state) => state.theme.hue);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Palette />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper className={classes.palette}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography>Dark Mode</Typography>
              <Switch
                checked={isDarkMode}
                onChange={() => dispatch(toggleDarkMode())}
              />
            </Grid>
          </Grid>
        </Paper>
      </Popover>
    </React.Fragment>
  );
};
