import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { Lobby } from '../lobby/Lobby';
import { GameSetup } from '../table/GameSetup';

export const AppLayout = (props) => {
  const currentGame = useSelector(
    (state) => state.authentication.currentUser.game
  );

  return (
    <React.Fragment>
      <Header />
      {currentGame ? <GameSetup gameUuid={currentGame.uuid} /> : <Lobby />}
    </React.Fragment>
  );
};
