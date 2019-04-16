const request = require('supertest');
const app = require('../lib/app');
// const People = require('../lib/models/People');

describe('app routes', () => {
  it('responds to the birthday route/path', () => {
    return request(app)
      .get('/birthday')
      .query({ name: 'laura' })
      .then(res => {
        expect(res.text).toEqual('Happy Birthday!');
      });
  });
  it('responds to test routes', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual('testing123');
      });
  });
});
