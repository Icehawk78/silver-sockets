const { Service } = require('feathers-sequelize');
const { locations } = require('./cards.const');

exports.Cards = class Cards extends Service {
  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    // attributes: {game, cardType, location, orderNumber, isFaceUp, isRotated, seenByPlayerIds}
    data = {
      ...data,
      orderNumber:
        super.find({
          query: {
            gameId: data.gameId,
            location: locations.DECK,
          },
        }).length + 1,
    };

    return super.create(data, params);
  }
};
