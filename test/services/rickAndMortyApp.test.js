const app = require('../../lib/rickAndMortyApp');
const request = require('supertest');

jest.mock('../../lib/services/rickAndMortyCharacter');

describe('rick and morty character', () => {
  it('gets a character from the rick and morty API', () => {
    return request(app)
      .get('/character/2')
      .then(res => {
        expect(res.text).toEqual({
          name: 'Morty Smith',
          species: 'Human',
          status: 'Alive'
        }
        );
      });
  });
});
