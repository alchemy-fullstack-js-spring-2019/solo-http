const request = require('supertest');
const { app } = require('../lib/app');

describe('app routes', () => {
  it('responds to birthday route', () => {
    return request(app)
      .get('/birthday')
      .then(res => {
        expect(res.text).toEqual('birthday');
      });
  });

  it('sends and recieves json', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual({ testing: 123 });
      });
  });
});
