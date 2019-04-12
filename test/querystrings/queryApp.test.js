const request = require('supertest');
const queryApp = require('../../lib/querystrings/queryApp');

describe('receives a query', () => {
  it('affirms when there is a match', () => {
    const exactSearch = '/you?name=Krusty';
    const named = 'Krusty';

    return request(queryApp)
      .get(exactSearch)
      .then(res => {
        expect(res.text).toContain(named);
      });
  });

  it('rejects when there is no match', () => {
    const wrongSearch = '/you?name=Kanga';
    return request(queryApp)
      .get(wrongSearch)
      .then(res => {
        expect(res.text).toEqual('You are not Krusty!');
      });
  });
});
