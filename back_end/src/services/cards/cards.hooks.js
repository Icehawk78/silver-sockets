const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');

const cardResolvers = {
  joins: {
    cardType: () => async (card, context) => {
      card.cardType = await context.app
        .service('players')
        .get(card.cardTypeUuid);
    },
    cardsSeenByPlayers: $select => async (card, context) => {
      card.cardsSeenByPlayers = await context.app
        .service('cardsSeenByPlayers')
        .find({
          query: { $select: $select, cardUuid: card.uuid },
          paginate: false
        });
    }
  }
};

const query = {
  cardTypes: true,
  cardsSeenByPlayers: true
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin(cardResolvers, query)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
