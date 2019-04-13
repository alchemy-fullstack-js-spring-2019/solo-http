const request = require('supertest');
const app = require('../server');
const People = require('../lib/model/People');

// jest.mock('../lib/services/__mocks__/rickAndMortyApi.js');

describe('app routes', () => {
  afterAll(() =>{
    return People.drop();
  });
  it('creates a person => /people', () => {
    return request(app)
      .post('/people') 
      .send({ name: 'Auntie Mame', age: 89, color: 'chartreuse' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Auntie Mame',
          age: 89,
          color: 'chartreuse'
        });
      });
  });
});

// it('gets a list of all people from /people', () => {
//   return request(app)
//   .get('/People');
// });
