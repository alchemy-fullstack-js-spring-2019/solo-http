const supertest = require('supertest');
const app = require('../lib/app');

describe('server app test', () => {
  it('tests paths', () => {
    const name = 'chris';
    return supertest(app)
      .get(`/you?name=${name}`)
      .then(res => {
        expect(JSON.parse(res.text)).toEqual({ text: `hi there ${name}` });
      });
  });
});
