const request = require('supertest');
const app = require('../lib/rickAndMortyApp');

jest.mock('../lib/services/rickAndMortyCharacter.js');

describe('rick and morty character', () => {
  it('gets a character from the rick and morty API', () => {
    return request(app)
      .get('/character/3')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Morty Smith',
          species: 'Human',
          status: 'Alive'
        });
      });
  });
});
