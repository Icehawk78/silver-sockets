const { Service } = require('feathers-sequelize');

exports.CardsSeenByPlayers = class CardsSeenByPlayers extends Service {
  setup(app) {
    this.app = app;
  }
};
