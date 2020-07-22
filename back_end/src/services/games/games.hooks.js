const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');

const gameResolvers = {
  joins: {
    players: () => async (game, context) => {
      game.players = await context.app.service('players').find({
        query: { gameUuid: game.uuid },
        paginate: false,
      });
    },
    cards: ($select) => async (game, context) => {
      game.cards = await context.app.service('cards').find({
        query: { $select: $select, gameUuid: game.uuid },
        paginate: false,
      });
    },
  },
};

const query = {
  cards: [['cardTypeUuid']],
  players: true,
};

const joinCreatedGame = async (context) => {
  await context.service.join(context.result, context.params.user.uuid);
  return context;
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [fastJoin(gameResolvers, query)],
    find: [],
    get: [],
    create: [joinCreatedGame],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
