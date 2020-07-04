import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import client from "./app/feather";
import "./App.css";

function App() {
  const [login, setLogin] = useState(null);
  const [users, setUsers] = useState([]);
  const usersService = client.service("users");

  useEffect(() => {
    client.authenticate().catch(() => setLogin(null));
    client.on("authenticated", login => {
      Promise.all([usersService.find()]).then(([userPage]) => {
        // We want the latest messages but in the reversed order
        const users = userPage.data;
        setLogin(login);
        setUsers(users);
      });
    });
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
      <div>
        <p>Login: {JSON.stringify(login)}</p>
        <p>Users: {JSON.stringify(users)}</p>
      </div>
    </div>
  );
}

export default App;
