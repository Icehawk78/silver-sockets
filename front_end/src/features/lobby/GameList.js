import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateGame, removeGame, selectGames } from "./gamesSlice";
// import { selectIsAuthenticated } from "../authentication/authenticationSlice";
import client from "../../app/feather";
import styles from "./GameList.module.css";
import { GameSetup } from "../table/GameSetup";

export function GameList() {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const [currentGameUuid, setCurrentGameUuid] = useState(null);
  const games = useSelector(selectGames);
  const dispatch = useDispatch();
  const gameService = client.service("games");

  useEffect(() => {
    const updateGameListener = game => {
      console.log(game);
      dispatch(updateGame(game));
    };
    const removeGameListener = game => {
      console.log(game);
      dispatch(removeGame(game));
    };

    gameService.on("created", updateGameListener);
    gameService.on("updated", updateGameListener);
    gameService.on("removed", removeGameListener);
    return () => {
      gameService.removeListener("created", updateGameListener);
      gameService.removeListener("updated", updateGameListener);
      gameService.removeListener("removed", removeGameListener);
    };
  }, [dispatch, gameService]);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => gameService.create({})}
        >
          Create Game
        </button>
      </div>
      <div className={styles.row}>
        <table className={styles.table} style={{ border: "black 1px solid" }}>
          <thead>
            <tr>
              <th>Game UUID</th>
              <th>Remove?</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => {
              return (
                <tr key={game.uuid}>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => setCurrentGameUuid(game.uuid)}
                    >
                      {game.uuid}
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => gameService.remove(game.uuid)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {currentGameUuid != null && <GameSetup gameUuid={currentGameUuid} />}
    </div>
  );
}
