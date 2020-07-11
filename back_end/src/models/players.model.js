// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const players = sequelizeClient.define(
    'players',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      orderNumber: { type: DataTypes.INTEGER, allowNull: false },
      points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isCurrent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isCalling: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

  players.associate = function(models) {
    const { games, users, cardsSeenByPlayers } = models;
    players.belongsTo(games);
    players.belongsTo(users);
    players.hasMany(cardsSeenByPlayers, { onDelete: 'CASCADE', hooks: true });
  };

  return players;
};
