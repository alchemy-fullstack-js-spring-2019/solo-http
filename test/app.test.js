const supertest = require('supertest');
const app = require('../lib/app');

describe('supertest test', () => {
    it('supertest to server path', () => {
      return supertest(app)
      .get(`/you?name=${name}`)
      .then(res => {
      expect(JSON.parse(res.text)).toEqual({ text: `Hello, ${name}.` });
    });
  });
});
