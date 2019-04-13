const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/models/People');

describe('app routes', () => {
  afterAll(() => {
    return People.drop();
  });
});

it('creates a person with /people', () => {
  
})
