module.exports = {
  getSWCharacter() {
    console.log('mock');
    return Promise.resolve({
      name: 'James Skywalker',
      height: '172',
      mass: '77',
      hairColor: 'blond',
      birthYear: '19BBY'
    });
  }
};
