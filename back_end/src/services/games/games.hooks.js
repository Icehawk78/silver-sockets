const { authenticate } = require('@feathersjs/authentication').hooks;

const nestedProps = context => {
  if (!context.params.sequelize) context.params.sequelize = {};
  Object.assign(context.params.sequelize, {
    include: [{ all: true }],
    raw: false
  });
  return context;
};

const joinCreatedGame = async context => {
  await context.service.join(context.result, context.params.user.uuid);
  return context;
};

module.exports = {
  before: {
    all: [authenticate('jwt'), nestedProps],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [joinCreatedGame],
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
