const request = require('supertest');
const app = require('../lib/app.js');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
// const Person = require('../lib/models/People');


describe('People API tests', () => {
  beforeEach(() => {
    mkdirp('./data/people');
  });
  afterEach(done => {
    rimraf('./data/people/', done);
  });
  it('POST method creates new person and return json', () => {
    return request(app)
      .post('/people')
      .send({ name: 'Marty', age: 28, class: 'wizard' })
      .then(res => {
        expect(JSON.parse(res.text)).toEqual({
          name: 'Marty',
          age: 28,
          class: 'wizard',
          _id: expect.any(String)
        });
      });
  });
});

