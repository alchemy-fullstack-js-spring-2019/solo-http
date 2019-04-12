function getCharacter() {
  return Promise.resolve({
    name: 'Mal',
    status: 'Alive',
    species: 'Human'
  });
}

module.exports = {
  getCharacter
};
