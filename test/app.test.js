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
      .send({ name: 'Marty', age: 28, class: 'wizard' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Marty',
          age: 28,
          class: 'wizard',
          _id: expect.any(String)
        });
      });
  });

  it('GET method (/people) returns a list of all people', () => {
    People.create({ name: 'Ipa', age: 19, class: 'rogue' });
    People.create({ name: 'Deborah', age: 42, class: 'bard' });
    return request(app)
      .get('/people')
      .then(res => {
        expect(res.body).toHaveLength(3);
        expect(res.body).toContainEqual({ name: 'Marty', age: 28, class: 'wizard', _id: expect.any(String) });
        expect(res.body).toContainEqual({ name: 'Ipa', age: 19, class: 'rogue', _id: expect.any(String) });
        expect(res.body).toContainEqual({ name: 'Deborah', age: 42, class: 'bard', _id: expect.any(String) });
      });
  });
  it('GET method (/people/:id/) returns single person', () => {
    People.create({ name: 'Ginny', age: 22, class: 'druid' })
      .then(createdPerson => {
        return request(app)
          .get(`/people/${createdPerson._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ name: 'Ginny', age: 22, class: 'druid', _id: expect.any(String) });
      });
  });
  it('PUT method (/people/:id) updates a person with specified id and returns update', () => {
    People.create({ name: 'Frefory', age: 15, class: 'barbarian' })
      .then(createdPerson => {
        return request(app)
          .put(`/people/${createdPerson._id}`)
          .send({ name: 'Gregory', age: 18, class: 'monk' })
          .then(res => {
            expect(res.body._id).toEqual(createdPerson._id);
            expect(res.body).toEqual({
              name: 'Gregory',
              age: 18,
              class: 'monk'
            });
          });
      });
  });
});

