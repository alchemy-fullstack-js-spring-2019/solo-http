const request = require('supertest');
const { peopleApp } = require('../lib/peopleApp');
const fsPromises = require('fs').promises;
const fs = require('fs');
const People = require('../lib/models/people');

jest.mock('../lib/service/rickAndMortyApi.js');

describe('app routes', () => {
  afterAll(() => {
    return People.drop();
  });

  it('creates a person with /people', () => {
    return request(peopleApp)
      .post('/people')
      .send({ name: 'ryan', age: 12, color: 'red' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'ryan',
          age: 12,
          color: 'red',
          _id: expect.any(String)
        });
      });
  });

  it('gets all /people', () => {
    return request(peopleApp)
      .get('/people')
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets a person by ID', () => {
    People.create({ name: 'tester', age: 'test', color: 'black' })
      .then(testPerson => {
        return request(peopleApp)
          .get(`/people/${testPerson._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({
          name: 'tester',
          age: 'test',
          color: 'black',
          _id: expect.any(String)
        });
      });
  });

  it('updates a person by ID', () => {
    return People.create({ name: 'original', age:'1', color: 'red' })
      .then(createdPerson => {
        return People.findByIdAndUpdate(createdPerson._id, {
          name: 'update'
        });
      })
      .then(updatedPerson => {
        expect(updatedPerson.name).toEqual('update');
      });
  });

  it('deletes person by ID', () => {
    return People.create({ name: 'random', age: 2, color: 'yellow' })
      .then(createdPerson => {
        return People.findByIdAndDelete(createdPerson._id);
      })
      .then(result => {
        expect(result).toEqual({ deleted: 1 });
      })
  })
});
