const { Service } = require('feathers-sequelize');

exports.CardTypes = class CardTypes extends Service {
  setup(app) {
    this.app = app;
  }
};
