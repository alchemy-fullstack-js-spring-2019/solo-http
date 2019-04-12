const request = require('supertest');
const peopleApp = require('../lib/people-app');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

describe('People routes', () => {
  beforeAll(done => {
    mkdirp('./data/people', done);
  });

  afterAll(done => {
    rimraf('./data/people', done);
  });

  it('creates a person with /people', () => {
    return request(peopleApp)
      .post('/people')
      .send({ name: 'leslie', age: 25, color: 'blue' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'leslie',
          age: 25,
          color: 'blue',
          _id: expect.any(String)
        });
      });
  });
});
