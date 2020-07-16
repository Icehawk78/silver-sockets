module.exports = {
  locations: {
    DECK: 'deck',
    DISCARD: 'discard',
    REMOVED: 'removed',
    IN_HAND: 'in-hand',
    VILLAGE1: 'village.1',
    VILLAGE2: 'village.2',
    VILLAGE3: 'village.3',
    VILLAGE4: 'village.4',
    getVillage: number => `village.${number}`
  }
};
