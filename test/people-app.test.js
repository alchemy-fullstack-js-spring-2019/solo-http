const request = require('supertest');
const peopleApp = require('../lib/people-app');
const People = require('../lib/models/People');

describe('People routes', () => {
  afterAll(() => {
    return People.drop();
  });

  it('creates a person with /people', () => {
    return request(peopleApp)
      .post('/people')
      .send({
        name: 'leslie',
        age: 25,
        color: 'blue'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'leslie',
          age: 25,
          color: 'blue',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of all people', () => {
    return request(peopleApp)
      .get('/people')
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets a person by id', () => {
    People.create({
      name: 'tester',
      age: 20,
      color: 'purple'
    })
      .then(createdPerson => {
        return request(peopleApp)
          .get(`/people/${createdPerson._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'tester',
          age: 20,
          color: 'purple',
          _id: expect.any(String)
        });
      });
  });
});
