// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const cardsSeenByPlayers = sequelizeClient.define(
    'cardsSeenByPlayers',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
        async afterCreate(createdObject) {
          await createdObject.reload();
        }
      }
    }
  );

  cardsSeenByPlayers.associate = function(models) {
    const { cards, players } = models;
    cardsSeenByPlayers.belongsTo(cards);
    cardsSeenByPlayers.belongsTo(players);
  };

  return cardsSeenByPlayers;
};
