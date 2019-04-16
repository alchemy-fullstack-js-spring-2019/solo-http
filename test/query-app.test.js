const request = require('supertest');
const queryApp = require('../lib/query-app');

describe('query routes', () => {
  it('responds to the route with name', () => {
    const url = '/you?name=leslie';

    return request(queryApp)
      .get(url)
      .then(res => {
        expect(res.text).toEqual('Hi there leslie!');
      });
  });

  it('responds to the route with no name', () => {
    const url = '/you?name=';

    return request(queryApp)
      .get(url)
      .then(res => {
        expect(res.text).toEqual('Hey there!');
      });
  });
});
