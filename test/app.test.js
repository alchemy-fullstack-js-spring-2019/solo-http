const request = require('supertest');
const app = require ('../lib/app');
const People = require('../lib/models/people');

describe('app routes', () => {
  afterAll(() => {
    return People.drop();
  });

  describe('creates person with /people', ()=>{
    return request(app)
    .post('/people')
    .send({})
  });