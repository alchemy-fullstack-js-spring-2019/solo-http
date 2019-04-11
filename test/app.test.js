const app = require('../lib/app.js');
const request = require('supertest');

describe('app routes', () => {
  it('it responds to a path', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toBe('testing123');
      });
  });
});
