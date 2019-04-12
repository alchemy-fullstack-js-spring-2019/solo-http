const request = require('supertest');
const app = require('../lib/app.js');
const People = require('../lib/models/People');


describe('People API tests', () => {
  // beforeAll(done => {
  //   mkdirp('./data/people', done);
  // });
  afterAll(() => {
    return People.drop();
  });
  it('POST method (/people) creates new person and return json', () => {
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
});

