const request = require('supertest');
const appRouting = require('../lib/app-routing');
const People = require('../lib/models/People');

// jest.mock('../lib/service/rickAndMortyApi.js');

describe('app routes', () => {
  afterAll(() =>{
    return People.drop();
  });

  it('creates a person with /people', () => {
    return request(appRouting)
      .post('/people')
      .send({ name: 'ryan', age: 32, color: 'red' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'ryan',
          age: 32,
          color: 'red',
          _id: expect.any(String)
        });
      });
  });
  
  it('returns a list of people', () => {
    return request(appRouting)
      .get('/people')
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});
