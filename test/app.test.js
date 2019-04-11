const request = require('supertest');
const app = require('../lib/app.js');


describe('something', () => {
  it('responds to tester route', () => {
    return request(app)
      .get('/tester')
      // .query({ name: 'ryan'})
      .then(res => {
        expect(res.text).toEqual('testing123');
      });
  });
});

