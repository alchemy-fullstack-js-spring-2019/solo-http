const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('responds to the birthday route', () => {
    return request(app)
      .get('/birthday')
      .query({ name: 'Parker' })
      .then(res => {
        expect(res.text).toEqual('Happy Birthday');
      });
  });
  
  it('json route', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ name: 'Parker' });
      });
  });
});
