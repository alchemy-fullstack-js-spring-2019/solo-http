const rickandmortyapp = require('../../lib/services/rick-and-morty-chars');
const req = require('supertest');


jest.mock('../../lib/services/rick-and-morty-chars.js');

describe('rick and morty character', () => {
  it('gets a character from the rick and morty API', () => {
    const id = 3;
    const expected = {
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human'
    };

    return req(rickandmortyapp)
      .get(`/character/${id}`)
      .then(res => {
        expect(res.body).toEqual(expected);
      });
  });
});
