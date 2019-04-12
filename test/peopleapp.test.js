const request = require('supertest');
const app = require('../lib/peopleApp');

describe('app routes', () => {
  it('creates a person with /people', () => {
    return request(app)
      .post('/people')
      .send({ name: 'laura', age: 25, color: 'blue' })
      .then(res => {
        console.log(res.text)
        expect(JSON.parse(res.text)).toEqual({
          name: 'laura',
          age: 25,
          color: 'blue',
          _id: expect.any(String)
        });
      });
  });
});
