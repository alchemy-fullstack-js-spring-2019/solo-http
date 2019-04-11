const request = require('supertest');
const app = require('../lib/JSONapp');

describe('app routes', () => {
  it('responds to the testing route', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual('{"testing":123}');
      });
  });
});
