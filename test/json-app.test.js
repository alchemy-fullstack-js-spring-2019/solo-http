const request = require('supertest');
const jsonApp = require('../lib/json-app');

describe('json routes', () => {
  it('responds to the test route', () => {
    return request(jsonApp)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual(({ testing: 123 }));
      });
  });
});
