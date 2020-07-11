// Initializes the `users` service on path `/users`
const { GameSilverTokens } = require('./gameSilverTokens.class');
const createModel = require('../../models/gameSilverTokens.model');
const hooks = require('./gameSilverTokens.hooks');

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gameSilverTokens', new GameSilverTokens(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gameSilverTokens');

  service.hooks(hooks);
};
