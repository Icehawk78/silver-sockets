'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('silverTokens', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      abilityJson: {
        type: Sequelize.JSON,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addColumn('gameSilverTokens', 'silverTokenUuid', {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'silverTokens',
        key: 'uuid',
      },
    });
    await queryInterface.removeColumn('games', 'silverToken');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('silverTokens');
    await queryInterface.removeColumn('gameSilverTokens', 'silverTokenUuid');
    await queryInterface.addColumn('games', 'silverToken', {
      type: Sequelize.STRING,
    });
  },
};
