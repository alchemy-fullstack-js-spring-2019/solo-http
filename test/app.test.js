const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('path name responds to birthday route', () => {
    return request(app)
    .get('/birthday')
    .then(res => {
      expect(res.text).toEqual('Happy birthday!');
    })
  });

  it('path name responds to tomorrow route', () => {
    return request(app)
    .get('/tomorrow')
    .then(res => {
      expect(res.text).toEqual('Tomorrow, tomorrow!');
    })
  });

  it('path name responds to birthday + tomorrow route', () => {
    return request(app)
    .get('/birthday/tomorrow')
    .then(res => {
      expect(res.text).toEqual('Tomorrow, tomorrow!');
    })
  });
});
