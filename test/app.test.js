const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/models/People');

describe('app routes', () => {
  afterEach(() => {
    return People.drop();
  });

  it('POSTS/creates a person to /people route', () => {
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
    return People.create({ name: 'blinky', age: 14, color: 'puce' })
      .then(createdPerson => {
        return request(app)
          .get('/people')
          .then(res=> {
            expect(res.body).toHaveLength(1);
          });
      });
  });
//make a person, expect to get that person back by id
  it('GETS a person by id', () => {
    return People.create({ name: 'tester', age: 100, color: 'blue' })
      .then(createdPerson => {
        return request(app)
          .get(`/people/${createdPerson._id}`);
      })
      .then(res=> {
        expect(res.body).toEqual({
          name: 'tester',
          age: 100,
          color: 'blue',
          _id: expect.any(String)
        });
      });
  });
//create a person, update with people.create with error, expect the corrected person
  it('PUTS/updates a person with :id and returns the update', () => {
    return People.create({ name: 'boofy', age: 29, color: 'purple' })
      .then(updatedPerson => {
        return request(app)
          .get(`/people/${updatedPerson._id}`);
      });
  });

  it('deletes a person by id', () => {
    return People.create({ name: 'tester' })
      .then(person => {
        return request(app)
          .delete(`/people/${person._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});
