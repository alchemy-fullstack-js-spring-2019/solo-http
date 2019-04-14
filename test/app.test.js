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
      .send({ name: 'test' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'test',
          _id: expect.any(String)
        });
      });
  });

  it('GETS a list of all people', () => {
    return People.create({ 
      name: 'blinky', 
      age: 14, 
      color: 'puce' 
    })
      .then(() => {
        return request(app)
          .get('/people');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toContainEqual({
          name: 'blinky', 
          age: 14, 
          color: 'puce',
          _id: expect.any(String)
        });
      });
  });

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

  it('updates a person by id', () => {
    return People.create({ name: 'testter' })
      .then(person => {
        return request(app)
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
        return request(app)
          .delete(`/people/${person._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });

  it.only('creates a toy with the /toys route', () => {
    return request(app)
      .post('/toys')
      .send({ type: 'crayon', color: 'red' })
      .then(res => {
        expect(res.body).toEqual({
          type: 'crayon',
          color: 'red', 
          _id: expect.any(String)
        });
      });
  });
});
