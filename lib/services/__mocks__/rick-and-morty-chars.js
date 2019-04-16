function findCharacter() {
  return Promise.resolve({
    name: 'Laura',
    species: 'Human',
    status: 'Alive'
  });
}

module.exports = findCharacter;
