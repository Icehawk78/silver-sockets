'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gameSilverToken', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      gameUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'games',
          key: 'uuid'
        }
      },
      playerUuid: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'players',
          key: 'uuid'
        }
      },
      location: {
        type: Sequelize.ENUM,
        values: [
          'deck',
          'discard',
          'removed',
          'in-hand',
          'village.1',
          'village.2',
          'village.3',
          'village.4'
        ],
        allowNull: false,
        defaultValue: 'removed'
      },
      orderNumber: { type: Sequelize.INTEGER },
      isUsed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async queryInterface => {
    queryInterface.dropTable('gameSilverToken');
  }
};
