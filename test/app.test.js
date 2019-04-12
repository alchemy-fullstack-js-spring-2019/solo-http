const request = require('supertest');
const { app } = require('../lib/app');

describe('app routes', () => {
  it('responds to birthday route', () => {
    return request(app)
      .get('/birthday')
      .then(res => {
        expect(res.text).toEqual('birthday');
      });
  });

  it('sends and recieves json', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual({ "testing": 123 });
      });
  });

  it('it can do handl querystrings', () => {
    return request(app)
      .get(`/you?name=${name}`)
      .then( person => {
        expect(person).toEqual(`${name}`)
      });
  });
});
