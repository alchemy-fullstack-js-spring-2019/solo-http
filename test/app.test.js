const request = require('supertest');
const app = require('../lib/app');

const fsPromises = require('fs').promises;

describe('server app routing tests', () => {
  
  afterEach(() => {
    return fsPromises.readdir('./data/people')
      .then(files => {
        return Promise.all([
          files.map(file => fsPromises.unlink(`./data/people/${file}`))
        ]);
      });
  });

  it('creates a person with /people', () => {
    const obj = { name: 'chris', age: 23, color: 'blue' };
    return request(app)
      .post('/people')
      .send(obj)
      .then(res => {
        expect(res.body).toEqual({ ...obj, _id: expect.any(String) });
      });
  });
});
