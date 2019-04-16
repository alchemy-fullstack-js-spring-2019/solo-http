const req = require('supertest');
const queryapp = require('../lib/query-app');

describe('query routes', () => {
  it('responds with name', () => {
    const url = '/you?name=laura';
    return req(queryapp)
      .get(url)
      .then(res => {
        expect(res.text).toEqual('Waaaaassssuuuup laura!!');
      });
  });
  it('responds to route with no name', () => {
    const url = '/you?name=';
    return req(queryapp)
      .get(url)
      .then(res => {
        expect(res.text).toEqual('Waaaaassssuuuup!!');
      });
  });
});

