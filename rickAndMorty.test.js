const { getCharacter } = require('./getCharacter');
jest.mock('./getCharacter.js', () => {
  return {
    getCharacter() {
      return Promise.resolve({
        name: 'Cara',
        status: 'Dead',
        species: 'Human'
      }
      );
    }
  };
});

describe('rick and morty', () => {
  it('grabs an id from a url and returns character info', () => {
    // let id = '10';
    return getCharacter()
      .then(result => {
        expect(result).toEqual({
          name: 'Cara',
          status: 'Dead',
          species: 'Human'
        }
        );
      });
  });
});
