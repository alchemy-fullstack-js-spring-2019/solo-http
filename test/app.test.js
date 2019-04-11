const app = require('../lib/app.js');
const request = require('supertest');

describe('app routes', () => {
  it('responds to a path', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toBe('testing123');
      });
  });

  it('responds with an object based on query string', () => {
    return request(app)
      .get('/you?name=tommy')
      .then(res => {
        expect(res.body).toEqual({ text: 'hi there tommy' });
      });
  });
});
