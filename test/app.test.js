const app = require('../lib/app');
const app2 = require('../lib/app2');
const request = require('supertest');


describe('app test', () => {
  it('tests the paths of a request', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual({ 'firstName': 'mister', 'lastName': 'Testy' });
      });
  });

  it('tests query strings', () => {
    const name = 'ben';
    return request(app)
      .get(`/you?name=${name}`)
      .then(res => {
        expect(res.body).toEqual({ 'text': 'hi there ben' });
      });
  });

  it.only('tests gets rick and morty characters', () => {
    return request(app2)
      .get('/character/1')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human'
        });
      });
  });
});
