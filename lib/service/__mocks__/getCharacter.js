module.exports = ({
  getCharacter(id) {
    switch(id) {
      case '1':
        return Promise.resolve({
          name: 'Tommy Tran',
          status: 'Alive',
          species: 'Human'
        });
      case '2':
        return Promise.resolve({
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human'
        });
    }
  }
});
