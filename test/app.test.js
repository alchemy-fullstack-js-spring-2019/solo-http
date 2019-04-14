const request = require('supertest');
const app = require('../lib/app');
jest.mock('../lib/services/getCharacter');

describe('app routes', () => {
  it('responds to the birthday route ', () => {
    return request(app)
      .get('/birthday?name=Cosmo')
      .then(res => {
        expect(res.text).toEqual('Happy Birthday!');
      });
  });
  it('responds to queries', () => {
    return request(app)
      .get('/you?name=Cosmo')
      .then(res => {
        expect(res.text).toEqual('Hi there Cosmo');
      });
  });
  it('responds to a query by calling an API', () => {
    return request(app)
      .get('/character?id=1')
      .then(res => {
        expect(res.text).toEqual('Rick Sanchez, Alive, Human');
      });
  });
});
