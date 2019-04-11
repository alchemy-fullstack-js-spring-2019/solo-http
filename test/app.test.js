const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('responds to the birthday route', () => {
    return request(app)
      .get('/birthday')
      .then(res => {
        expect(res.text).toEqual('Happy Birthday!');
      });
  });

  it('responds to the test route', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual('testing123');
      });
  });
});
