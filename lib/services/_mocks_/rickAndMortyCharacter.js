

module.exports = function getCharacter() {
    return Promise.resolve({
      name: 'Morty Smith',
      species: 'Human',
      status: 'Alive'
    });
};
