const request = require('supertest');
const peopleApp = require('../lib/peopleApp');
const People = require('../lib/models/People');


describe('app routes', () => {
  afterEach(() => {
    return People.drop();
  });

  it('creates a person with the /people route', () => {
    return request(peopleApp)
      .post('/people')
      .send({ name: 'test' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'test',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of people with the /people route', () => {
    return People.create({
      name: 'tester'
    })
      .then(() => {
        return request(peopleApp)
          .get('/people');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toContainEqual({
          name: 'tester',
          _id: expect.any(String)
        });
      });
  });

  it('gets a person by id', () => {
    return People.create({ name: 'tester' })
      .then(person => {
        return request(peopleApp)
          .get(`/people/${person._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'tester',
          _id: expect.any(String)
        });
      });
  });

  it('updates a person by id', () => {
    return People.create({ name: 'testter' })
      .then(person => {
        return request(peopleApp)
          .put(`/people/${person._id}`)
          .send({ name: 'tester' });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'tester',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a person by id', () => {
    return People.create({ name: 'tester' })
      .then(person => {
        return request(peopleApp)
          .delete(`/people/${person._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });

});
