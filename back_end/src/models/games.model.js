// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const games = sequelizeClient.define(
    'games',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      currentRound: { type: DataTypes.INTEGER },
      previousTurnPlayerId: { type: DataTypes.UUID },
      silverToken: { type: DataTypes.STRING },
      isStarted: {
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

  games.associate = function(models) {
    const { players, cards, gameSilverTokens } = models;
    games.hasMany(players, { onDelete: 'CASCADE', hooks: true });
    games.hasMany(cards, { onDelete: 'CASCADE', hooks: true });
    games.hasOne(gameSilverTokens, { onDelete: 'CASCADE', hooks: true });
  };

  return games;
};
