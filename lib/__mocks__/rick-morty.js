module.exports = {
  getCharacter() {
    return Promise.resolve({
      Name: 'Morty Smith',
      Status: 'Alive',
      Species: 'Human'
    });
  }
};
