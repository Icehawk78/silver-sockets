// Initializes the `users` service on path `/users`
const { CardTypes } = require('./cardTypes.class');
const createModel = require('../../models/cardTypes.model');
const hooks = require('./cardTypes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/cardTypes', new CardTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cardTypes');

  service.hooks(hooks);
};
