// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const silverTokens = sequelizeClient.define(
    'silverTokens',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: { type: DataTypes.STRING },
      origin: { type: DataTypes.STRING },
      abilityJson: { type: DataTypes.JSON },
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

  silverTokens.associate = function (models) {
    const { gameSilverTokens } = models;
    silverTokens.hasMany(gameSilverTokens);
  };

  return silverTokens;
};
