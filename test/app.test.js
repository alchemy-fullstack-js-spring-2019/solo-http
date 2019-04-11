const app = require('../lib/app');
const request = require('supertest');

describe('app test', () => {
  it('tests the paths of a request', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual({ 'firstName': 'mister', 'lastName': 'Testy' });
      });
  });

  it.only('tests query strings', () => {
    return request(app)
      .get('/you?name=ben')
      .then(res => {
        expect(res.body).toEqual({ 'text': `hi there ben` });
      });
  });
});
