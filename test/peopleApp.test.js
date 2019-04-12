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

let people;

describe('people app', () => {
  beforeAll(done => {
    mkdirp('./testData/people', done);
  });
  beforeEach(() => {
    people = new Store('./testData/people');
  });
  // beforeEach(done => {
  //   people.drop(done);
  // });
  afterAll(done => {
    rimraf('./testData', done);
  });

  it('saves a person', () => {
    return people.create({ 
      name: 'patrick', 
      age: 35, 
      color: 'blue',
      _id: uuid() 
    })
      .then(createdPerson => {
        expect(createdPerson).toEqual({ name: 'patrick', age: 35, color: 'blue', _id: expect.any(String) });
      });   
  });

  it('creates a person with /people', () => {
    return request(app)
      .post('/people')
      .send({ name: 'patrick', age: 35, color: 'blue' })
      .then(res => {
        expect(res.body).toEqual({ name: 'patrick', age: 35, color: 'blue', _id: expect.any(String) })
      });
  });
  
  it('gets people', () => {
    
  });

});

