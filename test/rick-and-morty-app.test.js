const request = require('supertest');
const rickAndMortyApp = require('../lib/rick-and-morty-app');

jest.mock('../lib/service/rick-and-morty-api.js');

describe('rick and morty app', () => {
  it('responds with a character at /character/:id', () => {
    return request(rickAndMortyApp)
      .get('/character/3')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Mal',
          species: 'Human',
          status: 'Alive'
        });
      });
  });
});

