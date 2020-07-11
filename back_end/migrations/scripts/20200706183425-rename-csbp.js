'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.renameTable('cardSeenByPlayer', 'cardsSeenByPlayers');
  },

  down: async queryInterface => {
    await queryInterface.renameTable('cardsSeenByPlayers', 'cardSeenByPlayer');
  }
};
