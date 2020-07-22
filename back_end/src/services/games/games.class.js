const { Service } = require('feathers-sequelize');
const { locations } = require('../cards/cards.const');
const {
  VILLAGE_COUNT,
  STARTING_CARDS_PER_VILLAGE,
  NUMBERS_COUNT,
  MIN_PLAYERS,
  MAX_PLAYERS,
  // TOTAL_ROUNDS
} = require('./games.const');

exports.Games = class Games extends Service {
  setup(app) {
    this.app = app;
  }

  getNumbers() {
    return NUMBERS_COUNT;
  }

  async cardNumbers() {
    const cards = this.app.service('cards');
    return [
      ...new Set(
        await cards
          .find({ query: { gameId: this.id } })
          .map((card) => card.cardType.number)
      ),
    ];
  }

  addCardType(data, params) {
    const cards = this.app.service('cards');
    const cardType = this.app.service('cardTypes').get(data.cardTypeUuid);
    const gameCardsByNumber = cards.find({
      query: {
        gameUuid: this.uuid,
        'cardTypes.number': cardType.number,
      },
    });
    if (gameCardsByNumber.length > 0) {
      return false;
    }

    cards.create(
      new Array(params.amount || cardType.deckAmount).fill({
        gameUuid: this.uuid,
        cardTypeUuid: cardType.uuid,
      })
    );
  }

  removeCardType(data) {
    const cards = this.app.service('cards');
    cards.remove(null, {
      query: {
        gameUuid: this.uuid,
        cardTypeUuid: data.cardTypeUuid,
      },
    });
  }

  async join(game, uuid) {
    console.log(game);
    const players = this.app.service('players');
    const existingPlayers = await players.find({
      query: {
        gameUuid: game.uuid,
        userUuid: uuid,
      },
    });
    if (game.isStarted || existingPlayers.length > 0) {
      return false;
    }

    await players.create({
      gameUuid: game.uuid,
      userUuid: uuid,
    });
  }

  leave(_, params) {
    const players = this.app.service('players');
    const existingPlayers = players.find({
      query: {
        gameUuid: this.uuid,
        userUuid: params.user.uuid,
      },
    });
    if (existingPlayers.length == 0) {
      return false;
    } else if (existingPlayers.length == 1 || this.isStarted) {
      super.remove({ uuid: this.uuid });
    } else {
      players.remove({
        query: {
          gameUuid: this.uuid,
          userUuid: params.user.uuid,
        },
      });
    }
  }

  start() {
    const cards = this.app.service('cards');
    const players = this.app.service('players');

    const currentPlayers = players.find({ query: { gameUuid: this.uuid } });
    const currentCards = cards.find({ query: { gameUuid: this.uuid } });
    if (
      this.silverToken == null ||
      this.cardNumbers.length < NUMBERS_COUNT ||
      currentPlayers.length < MIN_PLAYERS ||
      currentPlayers.length > MAX_PLAYERS
    ) {
      return false;
    }
    currentPlayers.shuffle().forEach((player, index) => {
      players.patch(player.uuid, {
        orderNumber: index + 1,
        isCurrent: index == 0,
      });
    });
    currentCards.shuffle();
    let currentIndex = 0;
    for (let village = 1; village <= VILLAGE_COUNT; village++) {
      for (
        let orderNumber = 1;
        orderNumber <= STARTING_CARDS_PER_VILLAGE;
        orderNumber++
      ) {
        cards.patch(currentCards[currentIndex].uuid, {
          location: locations.getVillage(village),
          orderNumber: orderNumber,
        });
        currentIndex++;
      }
    }
    cards.patch(currentCards[currentIndex].uuid, {
      location: locations.DISCARD,
      orderNumber: 0,
    });
    currentIndex++;
    for (currentIndex; currentIndex < currentCards.length; currentIndex++) {
      cards.patch(currentCards[currentIndex].uuid, {
        location: locations.DECK,
        orderNumber:
          currentIndex - VILLAGE_COUNT * STARTING_CARDS_PER_VILLAGE + 1,
      });
    }
    super.patch(this.uuid, { isStarted: true, currentRound: 1 });
  }

  // availableActions(data, params) {
  //   const players = this.app.service('players');
  //   const currentPlayer = players.find({
  //     query: {
  //       gameUuid: this.uuid,
  //       userUuid: params.user.uuid,
  //       isCurrent: true
  //     }
  //   });
  //   if (
  //     !this.isStarted ||
  //     this.currentRound > TOTAL_ROUNDS ||
  //     currentPlayer.length == 0
  //   ) {
  //     return [];
  //   }
  //
  //   const cards = this.app.service('cards');
  //   const currentVillage = cards.find({
  //     query: { location: locations.getVillage(currentPlayer.orderNumber) }
  //   });
  // }
};
