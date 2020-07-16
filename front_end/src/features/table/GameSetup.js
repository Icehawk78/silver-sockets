import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../authentication/authenticationSlice";
import client from "../../app/feather";
import { NUMBERS_COUNT } from "./games.const";
// import styles from "./Lobby.module.css";

export const GameSetup = props => {
  const { gameUuid } = props;
  const game = useSelector(state => state.games.games[gameUuid]);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const cardTypeService = client.service("cardTypes");
  const gameSilverTokenService = client.service("gameSilverTokens");

  useEffect(() => {
    const initialLoad = async () => {
      const loadCalls = [cardTypeService.find(), gameSilverTokenService.find()];
      Promise.all(loadCalls).then(
        ([cardTypesResults, gamesSilverTokensResults]) => {
          console.log("Messages loaded: ", cardTypesResults.data);
          // dispatch(loadCardTypes(cardTypesResults.data));
          console.log("Games loaded: ", gamesSilverTokensResults.data);
          // dispatch(loadGameSilverTokens(gamesSilverTokensResults.data));
        }
      );
    };

    if (isAuthenticated) {
      initialLoad();
      return;
    }
    client.once("authenticated", initialLoad);
    return () => {
      client.removeListener("authenticated", initialLoad);
    };
  }, [cardTypeService, dispatch, gameSilverTokenService, isAuthenticated]);

  return (
    <div>
      <span>Cards go from 0 to {NUMBERS_COUNT}</span>
      <span>Game has {game.cards.length} cards.</span>
    </div>
  );
};
