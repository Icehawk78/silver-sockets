const users = require('./users/users.service.js');
const games = require('./games/games.service.js');
const players = require('./players/players.service.js');
const gameSilverTokens = require('./gameSilverTokens/gameSilverTokens.service.js');
const cardTypes = require('./cardTypes/cardTypes.service.js');
const cards = require('./cards/cards.service.js');
const cardsSeenByPlayers = require('./cardsSeenByPlayers/cardsSeenByPlayers.service.js');
const messages = require('./messages/messages.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(games);
  app.configure(players);
  app.configure(cardTypes);
  app.configure(cards);
  app.configure(cardsSeenByPlayers);
  app.configure(gameSilverTokens);
  app.configure(messages);
};
