const app = require('../lib/app.js');
const request = require('supertest');

describe('app routes', () => {
  it('responds to a path', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual({ testing: 123 });
      });
  });

  it('responds with an object based on query string', () => {
    return request(app)
      .get('/you?name=tommy')
      .then(res => {
        expect(res.body).toEqual({ text: 'hi there tommy' });
      });
  });

  it('gets Rick object from api', () => {
    return request(app)
      .get('/character/1')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human'
        });
      });
  });

  it('gets Morty object from api', () => {
    return request(app)
      .get('/character/2')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human'
        });
      });
  });
});
