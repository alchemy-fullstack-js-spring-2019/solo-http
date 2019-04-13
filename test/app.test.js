const request = require('supertest');
const app = require('../lib/app');
// people
describe('app routes', () => {
  it('responds to the birthday route/path', () => {
    return request(app)
      .get('/birthday')
      .query({ name: 'laura' })
      .then(res => {
        expect(res.text).toEqual('Happy Birthday Biiitch');
      });
  });
  it('responds to test routes', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual('testing123');
      });
  });
  // put it here
});
it('creates a person w/ the /people route', () => {
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
