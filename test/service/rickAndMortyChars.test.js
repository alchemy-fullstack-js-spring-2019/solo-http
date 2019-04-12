const { getCharacter } = require('../../lib/service/getCharacter');

jest.mock('../../lib/service/getCharacter.js');

describe('Rick and Morty API test', () => {
  it('getCharacter takes an id and returns name, status and species', () => {
    const id = 2;
    const expected = {
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human'
    };

    return getCharacter(id)
      .then(res => {
        expect(res).toEqual(expected);
      });
  });
});
