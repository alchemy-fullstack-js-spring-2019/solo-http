const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/models/People');

describe('app routes', () => {
  afterAll(() => {
    return People.drop();
  });

  it('POSTS a person to /people', () => {
    return request(app)
      .post('/people')
      .send({ name: 'cu', age: 12, color: 'beige' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'cu',
          age: 12,
          color: 'beige',
          _id: expect.any(String)
        });
      });
  });
  it('GETS a list of all people', () => {
    return request(app)
      .get('/people')
      .then(res=> {
        expect(res.body).toHaveLength(1);
      });
  });
  // it('GETS a person by id', () => {
  //   People.create({ name: 'tester', age: 100, color: 'blue' })
  //     .then(createdPerson => {
  //       return request(app)
  //         .get('/people/${createdPerson._id')
  //     })
  // });
});
