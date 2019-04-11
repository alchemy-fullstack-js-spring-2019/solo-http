const appQuery = require('../lib/app.query.js');
const request = require('supertest');

describe('testing appQuery', () => {
  it('uses query strings to send messages', () => {
    request(appQuery)
      .get('/you?name=marty')
      .then(res => {
        expect(res.text).toEqual(JSON.stringify({ text: 'hi there marty' }));
      });
  });
});


