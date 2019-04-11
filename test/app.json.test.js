const request = require('supertest');
const appJson = require('../lib/app.json.js');


describe('appJson testing', () => {
  it('responds to tester route with a json', () => {
    return request(appJson)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual(JSON.stringify({ testing: 123 }));
      })
  });
});
