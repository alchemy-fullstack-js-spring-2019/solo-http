function findCharacter() {
  return Promise.resolve({
    name: 'Morty Smith',
    species: 'Human',
    status: 'Alive'
  });
}

module.exports = findCharacter;
