// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    'users',
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        isUUID: 4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      email: { type: DataTypes.STRING },
      displayName: { type: DataTypes.STRING },
      googleId: { type: DataTypes.STRING },
      facebookId: { type: DataTypes.STRING }
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

  users.associate = function(models) {
    const { players } = models;
    users.hasMany(players, { onDelete: 'CASCADE', hooks: true });
  };

  return users;
};
