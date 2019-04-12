const request = require('supertest');
const appRouting = require('../lib/app-routing');

describe('app routes', () => {
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

});
