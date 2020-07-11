const { authenticate } = require('@feathersjs/authentication').hooks;

const nestedProps = context => {
  if (!context.params.sequelize) context.params.sequelize = {};
  Object.assign(context.params.sequelize, {
    include: [{ all: true }],
    raw: false
  });
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
