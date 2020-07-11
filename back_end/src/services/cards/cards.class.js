const { Service } = require('feathers-sequelize');

const locations = {
  DECK: 'deck',
  DISCARD: 'discard',
  REMOVED: 'removed',
  IN_HAND: 'in-hand',
  VILLAGE1: 'village.1',
  VILLAGE2: 'village.2',
  VILLAGE3: 'village.3',
  VILLAGE4: 'village.4',
  getVillage: number => `village.${number}`
};

exports.Locations = locations;
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
            location: locations.DECK
          }
        }).length + 1
    };

    return super.create(data, params);
  }
};
