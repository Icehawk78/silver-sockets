// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const cards = sequelizeClient.define(
    'cards',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      location: {
        type: DataTypes.ENUM,
        values: [
          'deck',
          'discard',
          'removed',
          'in-hand',
          'village.1',
          'village.2',
          'village.3',
          'village.4',
        ],
        allowNull: false,
        defaultValue: 'deck',
      },
      orderNumber: { type: Sequelize.INTEGER, allowNull: false },
      isFaceUp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isRotated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
        async afterCreate(createdObject) {
          await createdObject.reload();
        },
      },
    }
  );

  cards.associate = function (models) {
    const { games, cardTypes, cardsSeenByPlayers } = models;
    cards.belongsTo(cardTypes);
    cards.belongsTo(games);
    cards.hasMany(cardsSeenByPlayers, { onDelete: 'CASCADE', hooks: true });
  };

  return cards;
};
