'use strict';
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'silverTokens',
      [
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Amulet',
          origin: 'Amulet',
          abilityJson:
            '{ \
            "silverTokenAction": "SELF_PROTECT", \
            "amount": 1, \
            "displayText": \
              "Choose one card in your village to place the amulet on. Nothing may interact with that card for the rest of the round." \
          }',
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Bullet',
          origin: 'Bullet',
          abilityJson:
            '{ \
            "silverTokenAction": "SELF_REMOVE", \
            "amount": 1, \
            "displayText": \
              "Remove one card in your village." \
          }',
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Coin',
          origin: 'Coin',
          abilityJson:
            '{ \
            "silverTokenAction": "SELF_FLIP", \
            "amount": 1, \
            "displayText": \
              "Choose one card in your village, and flip it." \
          }',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      'silverTokens',
      { origin: { [Op.in]: ['Amulet', 'Bullet', 'Coin'] } },
      {}
    );
  },
};
