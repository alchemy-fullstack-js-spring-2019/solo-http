const app = require('../../lib/rickAndMortyChars');
const request = require('supertest');

jest.mock('../../lib/service/getCharacter.js');

describe('Rick and Morty API test', () => {
  it('getCharacter takes an id and returns name, status and species', () => {
    const id = 3;
    const expected = {
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human'
    };

    return request(app)
      .get(`/character/${id}`)
      .then(res => {
        expect(res.body).toEqual(expected);
      });
  });
});
