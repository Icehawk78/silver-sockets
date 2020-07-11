'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'cardTypes',
      [
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Villager',
          number: 0,
          deckAmount: 2,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "faceUpVillageAlways": "VILLAGER_ROUND_END", \
            "amount": 2, \
            "displayText": \
              "The round immediately ends when two Villagers are face up in any player\'s village." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Squire',
          number: 1,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "faceUpVillageAlways": "SQUIRE_FILL", \
            "amount": 1, \
            "displayText": "Display one card face up beside the deck." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Empath',
          number: 2,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "faceUpVillageAction": "SELF_PEEK", \
            "amount": 1, \
            "displayText": "Once per turn, you may peek at one of your cards." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Bodyguard',
          number: 3,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "faceUpVillageAction": "PROTECT", \
            "displayText": \
              "Once per turn, you may protect or unprotect one of your cards with this." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Rascal',
          number: 4,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "faceUpVillageAction": "DECK_DRAW_EXTRA", \
            "amount": 1, \
            "displayText": \
              "When drawing cards from the deck, you may draw one extra." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Exposer',
          number: 5,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "playFromDeck": "SELF_FACEUP", \
            "amount": 1, \
            "displayText": "You may turn one of your cards faceup." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Revealer',
          number: 6,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "playFromDeck": "ANY_FACEUP", \
            "amount": 1, \
            "displayText": "You may turn one card faceup." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Beholder',
          number: 7,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "playFromDeck": "SELF_PEEK", \
            "amount": 2, \
            "displayText": "You may peek at one of your cards." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Apprentice Seer',
          number: 8,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "playFromDeck": "OTHER_PEEK", \
            "amount": 1, \
            "displayText": "You may peek at one opponent\'s card." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Seer',
          number: 9,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "playFromDeck": "ANY_PEEK", \
            "amount": 1, \
            "displayText": "You may peek at one card." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Master',
          number: 10,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "playFromDeck": "SELF_EXCHANGE_FROM_DISCARD", \
            "displayText": \
              "You may exchange cards with any card from the discard." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Witch',
          number: 11,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "playFromDeck": "ANY_EXCHANGE_FROM_DECK", \
            "displayText": \
              "View the top card of the deck and then exchange it with any village." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Robber',
          number: 12,
          deckAmount: 4,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "playFromDeck": "SWAP_SELF_AND_OTHER", \
            "amount": 1, \
            "displayText": \
              "You may swap one of your cards for a card in another player\'s village, and then peek at the new card." \
          }'
        },
        {
          uuid: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Doppelgänger',
          number: 13,
          deckAmount: 2,
          origin: 'Amulet',
          abilityJson:
            '{ \
            "onDiscardAlways": "MIMIC_CARD", \
            "displayText": \
              "When exchanging cards, this can be treated as any number for determining matches." \
          }'
        }
      ],
      {}
    );
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('cardTypes', { origin: 'Amulet' }, {});
  }
};
