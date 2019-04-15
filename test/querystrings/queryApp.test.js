const request = require('supertest');
const queryApp = require('../../lib/querystrings/queryApp');

describe('receives a query', () => {
  it('affirms when there is a match', () => {
    const exactSearch = '/you?name=Krusty';
    const named = 'Hi there Krusty!';

    return request(queryApp)
      .get(exactSearch)
      .then(res => {
        expect(res.text).toEqual(named);
      });
  });
});
