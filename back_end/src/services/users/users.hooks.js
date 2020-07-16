const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');

const userResolvers = {
  joins: {
    player: () => async (user, context) => {
      user.player = (
        await context.app.service('players').find({
          query: { userUuid: user.uuid },
          paginate: false
        })
      )[0];
    },
    game: $select => async (user, context) => {
      user.game = (
        await context.app.service('games').find({
          query: { $select: $select },
          sequelize: {
            scope: ['unfinished', { method: ['includesUser', user.uuid] }]
          },
          paginate: false
        })
      )[0];
    }
  }
};

const query = {
  game: [['uuid', 'isStarted', 'currentRound']],
  player: true
};

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [fastJoin(userResolvers, query)],
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
