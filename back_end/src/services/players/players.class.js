const { Service } = require('feathers-sequelize');

exports.Players = class Players extends Service {
  setup(app) {
    this.app = app;
  }
};
