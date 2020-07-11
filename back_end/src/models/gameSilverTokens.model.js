// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const gameSilverTokens = sequelizeClient.define(
    'gameSilverTokens',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      location: {
        type: Sequelize.ENUM,
        values: [
          'deck',
          'discard',
          'removed',
          'in-hand',
          'village.1',
          'village.2',
          'village.3',
          'village.4'
        ],
        allowNull: false,
        defaultValue: 'removed'
      },
      orderNumber: { type: Sequelize.INTEGER },
      isUsed: {
        type: Sequelize.BOOLEAN,
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

  gameSilverTokens.associate = function(models) {
    const { games, players } = models;
    gameSilverTokens.belongsTo(games);
    gameSilverTokens.belongsTo(players);
  };

  return gameSilverTokens;
};
