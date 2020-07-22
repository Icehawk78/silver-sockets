// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const messages = sequelizeClient.define(
    'messages',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        raw: false,
        include: [{ all: true }],
      },
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

  messages.associate = function (models) {
    const { games, users } = models;
    messages.belongsTo(games);
    messages.belongsTo(users);
  };

  return messages;
};
