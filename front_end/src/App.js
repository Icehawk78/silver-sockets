import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { Button, Grid, CssBaseline, Typography } from "@material-ui/core";
import { Lobby } from "./features/lobby/Lobby";
import { Login } from "./features/authentication/Login";
import { Header } from "./features/layout/Header";
import { login, logout } from "./features/authentication/authenticationSlice";
import { getTheme } from "./features/themes/Themes";
import client from "./app/feather";
import "./App.css";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const hue = useSelector((state) => state.theme.hue);
  const theme = useMemo(() => getTheme(hue, isDarkMode), [hue, isDarkMode]);

  useEffect(() => {
    client.authenticate().catch((x) => {
      console.log(x);
      dispatch(logout());
    });
  }, [dispatch]);

  useEffect(() => {
    const handleLogin = (authData) => {
      console.log(authData);
      dispatch(login(authData));
    };
    client.on("authenticated", handleLogin);
    return () => {
      client.removeListener("authenticated", handleLogin);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleLogout = (authData) => {
      dispatch(logout());
    };
    client.on("logout", handleLogout);
    return () => {
      client.removeListener("logout", handleLogout);
    };
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuthenticated && <Login />}
      {isAuthenticated && (
        <React.Fragment>
          <Header />
          <Lobby />
        </React.Fragment>
      )}
    </ThemeProvider>
  );
}

export default App;
