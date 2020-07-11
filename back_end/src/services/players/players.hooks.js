const { authenticate } = require('@feathersjs/authentication').hooks;

const nestedProps = context => {
  if (!context.params.sequelize) context.params.sequelize = {};
  Object.assign(context.params.sequelize, {
    include: [{ all: true }],
    raw: false
  });
  return context;
};

const setOrderNumber = async context => {
  const orderNumber = await context.service.find({
    query: {
      gameUuid: context.data.gameUuid
    }
  });
  console.log(orderNumber.data);
  context.data.orderNumber = orderNumber.data.length + 1;
  return context;
};

module.exports = {
  before: {
    all: [authenticate('jwt'), nestedProps],
    find: [],
    get: [],
    create: [setOrderNumber],
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
