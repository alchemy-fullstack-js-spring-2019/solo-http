const request = require('supertest');
const rickAndMortyApp = require('../lib/rick-and-morty-api');

jest.mock('../lib/rick-and-morty-api.js');

describe('rick and morty API routes', () => {
  it('responds with a character at /character/:id', () => {
    return request(rickAndMortyApp)
      .get('/character/1')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Morty Smith',
          species: 'Human',
          status: 'Alive'
        });
      });
  });
});
