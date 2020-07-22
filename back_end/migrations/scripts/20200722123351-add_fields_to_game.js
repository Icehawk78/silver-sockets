'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'games',
          'cardSet',
          {
            type: Sequelize.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'games',
          'isPrivate',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('games', 'cardSet', { transaction: t }),
        queryInterface.removeColumn('games', 'isPrivate', { transaction: t }),
      ]);
    });
  },
};
