const supertest = require('supertest');
const app = require('../lib/app');

describe('supertest test', () => {
    it('supertest to server path', () => {
      return supertest(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual('T e s t i n g 1 2 3');
    });
  });
});
