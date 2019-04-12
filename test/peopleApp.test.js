const app = require('../lib/peopleApp');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/models/Store');
const fsPromises = require('fs').promises;
const People = require('../lib/models/People');
const uuid = require('uuid/v4');
const request = require('supertest');

// const rootDirectory = path.join(_dirname, '../', 'people');

describe('people app', () => {
  afterEach(() => {
    return People.drop();
  });

  it('creates a person with /people', () => {
    return request(app)
      .post('/people')
      .send({ name: 'patrick', age: 35, color: 'blue' })
      .then(res => {
        expect(res.body).toEqual({ name: 'patrick', age: 35, color: 'blue', _id: expect.any(String) });
      });
  });
  
  it('gets a list of all people', () => {
    return People.create({
      name: 'tester'
    })
      .then(() => {
        return request(app)
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
    People.create({ name: 'hey', age: 10, color: 'orange' })
      .then(createdPerson => {
        return request(app)
          .get(`/people/${createdPerson._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'hey',
          age: 10,
          color: 'orange',
          _id: expect.any(String)
        });
      });
  });
  
  it('updates an id and returns updated person', () => {
    
    People.create({ name: 'hey', age: 10, color: 'orange' })
      .then(createdPerson => {
        return request(app)
          .get(`/people/${createdPerson._id}`);
      })
      .then(foundPerson => {
        People.findByIdAndUpdate(foundPerson._id, updatedPerson);
      })
      .then(updatedPerson => {
        console.log(updatedPerson);
        expect(updatedPerson).toEqual({ name: 'hey', age: 10, color: 'orange', id: 'hello' });
      });
  });
});

