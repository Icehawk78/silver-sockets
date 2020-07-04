'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'twitterId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'twitterId', Sequelize.STRING);
  }
};
