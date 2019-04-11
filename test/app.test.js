const request = require('supertest');
const app = require('../app');

describe('app routes', () => {
  it('tester pathname resolves ', () => {
    return request(app).get('/tester')
      .then(res => expect(res.body).toEqual({ testing: '123' }));
  });

  it('resolves to object', () => {
    return request(app).get('/you?name=cara')
      .then(res => expect(res.body).toEqual({ text: 'hi there cara' }));
  });
});

