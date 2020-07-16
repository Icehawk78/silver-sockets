import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cyan from "@material-ui/core/colors/cyan";
import { Lobby } from "./features/lobby/Lobby";
import { Login } from "./features/authentication/Login";
import { login, logout } from "./features/authentication/authenticationSlice";
import client from "./app/feather";
import "./App.css";

function App() {
  const isAuthenticated = useSelector(
    state => state.authentication.isAuthenticated
  );
  const currentUser = useSelector(state => state.authentication.currentUser);
  const [showLobby, setShowLobby] = useState(true);
  const dispatch = useDispatch();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: cyan[100]
          },
          secondary: {
            main: cyan[900]
          },
          contrastThreshold: 5,
          tonalOffset: 0.1
        }
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    client.authenticate().catch(x => {
      console.log(x);
      dispatch(logout());
    });
  }, [dispatch]);

  useEffect(() => {
    const handleLogin = authData => {
      console.log(authData);
      dispatch(login(authData));
    };
    client.on("authenticated", handleLogin);
    return () => {
      client.removeListener("authenticated", handleLogin);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleLogout = authData => {
      dispatch(logout());
    };
    client.on("logout", handleLogout);
    return () => {
      client.removeListener("logout", handleLogout);
    };
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {!isAuthenticated && <Login />}
        {isAuthenticated && (
          <div>
            <div>
              <p>Logged in as: {currentUser.displayName}</p>
              <button onClick={() => client.logout()}>Logout</button>
            </div>
            <button
              onClick={() => {
                setShowLobby(!showLobby);
              }}
            >
              Toggle Lobby
            </button>
            {showLobby && <Lobby />}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
