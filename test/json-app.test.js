const request = require('supertest');
const jsonApp = require('../lib/json-app');

describe('app routes', () => {
  it('responds to the test route', () => {
    return request(jsonApp)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual(('{"testing":123}'));
      });
  });
});
