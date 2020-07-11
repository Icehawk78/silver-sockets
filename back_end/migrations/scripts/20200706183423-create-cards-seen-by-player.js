'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
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
      cardTypeUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'card_types',
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
        defaultValue: 'deck'
      },
      orderNumber: { type: Sequelize.INTEGER, allowNull: false },
      isFaceUp: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isRotated: {
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
    await queryInterface.dropTable('cards');
  }
};
