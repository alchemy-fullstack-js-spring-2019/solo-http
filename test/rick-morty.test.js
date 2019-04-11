const { getCharacter } = require('../lib/rick-morty');

jest.mock('../lib/rick-morty');

describe('rick and morty service', () => {
  it('can get a character by id', () => {
    return getCharacter(1)
      .then(character => {
        expect(character).toEqual({
          Name: 'Morty Smith',
          Species: 'Human',
          Status: 'Alive'
        });
      });
  });
});
