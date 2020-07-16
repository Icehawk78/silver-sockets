// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const { TOTAL_ROUNDS } = require('../services/games/games.const');

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
      },
      scopes: {
        unfinished: {
          where: {
            [Op.or]: {
              currentRound: { [Op.lte]: TOTAL_ROUNDS },
              isStarted: false
            }
          }
        },
        includesUser(userUuid) {
          return {
            include: [
              {
                attributes: [],
                model: app.service('players').Model,
                where: { userUuid: userUuid },
                required: true
              }
            ]
          };
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
