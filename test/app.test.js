const supertest = require('supertest');
const app = require('../lib/app');

describe('server app test', () => {
  it('tests paths', () => {
    return supertest(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual('testing123');
      });
  });
});
