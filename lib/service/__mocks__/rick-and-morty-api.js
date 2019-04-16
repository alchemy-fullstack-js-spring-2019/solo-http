function getCharacter() {
  return Promise.resolve({
    name: 'Leslie',
    species: 'Human',
    status: 'Alive'
  });
}

module.exports = { getCharacter }; 
