const { authenticate } = require('@feathersjs/authentication').hooks;

const nestedProps = (context) => {
  if (!context.params.sequelize) context.params.sequelize = {};
  Object.assign(context.params.sequelize, {
    include: [{ all: true }],
    raw: false,
  });
  return context;
};

const setOrderNumber = async (context) => {
  const orderNumber = await context.service.find({
    query: {
      gameUuid: context.data.gameUuid,
    },
  });
  console.log(orderNumber.data);
  context.data.orderNumber = orderNumber.data.length + 1;
  return context;
};

const removeGameIfEmpty = async (context) => {
  const game = await context.app.service('games').get(context.result.gameUuid);
  if (game.players.length == 0) {
    context.app.service('games').remove(context.result.gameUuid);
  }
};

module.exports = {
  before: {
    all: [authenticate('jwt'), nestedProps],
    find: [],
    get: [],
    create: [setOrderNumber],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [removeGameIfEmpty],
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
