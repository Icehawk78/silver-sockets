import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import { Lobby } from "./features/lobby/Lobby";
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

  const doStuff = () => {
    setShowLobby(!showLobby);
  };

  useEffect(() => {
    client.authenticate().catch(x => {
      console.log(x);
      dispatch(logout());
    });
  }, [dispatch]);

  useEffect(() => {
    const handleLogin = authData => {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => doStuff()}>Toggle Lobby</button>
      </header>
      {isAuthenticated && (
        <div>
          <div>
            <p>Logged in as: {currentUser.displayName}</p>
            <button onClick={() => client.logout()}>Logout</button>
          </div>
          {showLobby && <Lobby />}
        </div>
      )}
      {!isAuthenticated && (
        <div>
          <a href={`${process.env.REACT_APP_BACK_END_URL}/oauth/google`}>
            <img src="/google_signin.png" alt="Log in with Google" />
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
