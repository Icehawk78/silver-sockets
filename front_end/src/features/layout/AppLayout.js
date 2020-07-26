import React from 'react';
import { Lobby } from '../lobby/Lobby';
import { Header } from './Header';

export const AppLayout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Lobby />
    </React.Fragment>
  );
};
