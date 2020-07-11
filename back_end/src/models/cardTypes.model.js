// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const cardTypes = sequelizeClient.define(
    'cardTypes',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        isUUID: 4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      name: { type: DataTypes.STRING },
      number: { type: DataTypes.INTEGER },
      deckAmount: { type: DataTypes.INTEGER },
      origin: { type: DataTypes.STRING },
      abilityJson: { type: DataTypes.JSON }
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

  cardTypes.associate = function(models) {
    const { cards } = models;
    cardTypes.hasMany(cards, { onDelete: 'CASCADE', hooks: true });
  };

  return cardTypes;
};
