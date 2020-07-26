'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameTable('gameSilverToken', 'gameSilverTokens');
  },

  down: async (queryInterface) => {
    await queryInterface.renameTable('gameSilverTokens', 'gameSilverToken');
  },
};
