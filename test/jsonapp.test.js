const request = require('supertest');
const jsonapp = require('../lib/jsonapp');

describe('test should route path', () => {
  it('should respond to tester ', () => {
    return request(jsonapp)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual(({ testing: 123 }));
      });
  });
});
