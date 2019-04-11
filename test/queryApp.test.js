const request = require('supertest');
const queryApp = require('../lib/queryApp');

describe('query app routes', () => {
  it('responds to the query string - name', () => {
    const url = '/you?name=megan';
    return request(queryApp)
      .get(url)
      .then(res => {
        expect(res.text).toEqual('hello there megan');
      });
  });
  it('responds to the query string - no name', () => {
    const url = '/you?name=';
    return request(queryApp)
      .get(url)
      .then(res => {
        expect(res.text).toEqual('hey');
      });
  });
});
