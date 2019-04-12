const request = require('supertest');
const app = require('../lib/app.js');
const People = require('../lib/models/People');


describe('People API tests', () => {
  // beforeAll(done => {
  //   mkdirp('./data/people', done);
  // });
  afterEach(() => {
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
  it('gets a list of people with the /people route', () => {
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
    return People.create({ name: 'tester' })
      .then(person => {
        return request(app)
          .get(`/people/${person._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'tester',
          _id: expect.any(String)
        });
      });
  });
  it('updates a person by ID', () => {
    return People.create({ name: 'testrr' })
      .then(person => {
        return request(app)
          .put(`/people/${person._id}`)
          .send({ name: 'tester'});
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
});

