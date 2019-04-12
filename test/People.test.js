const app = require('../lib/app');
const request = require('supertest');
const People = require('../lib/models/People');

describe('testing people db', () => {

  afterAll(() => {
    return People.drop();
  });

  it('gets a person by id and delete', () => {
    return People.create({ name: 'patty', title: 'mom' })
      .then(person => {
        return request(app)
          .delete(`/people/${person._id}`);
      })
      .then(returnObj => {
        expect(JSON.parse(returnObj.text).deleted).toEqual(1);
      })
      .then(() => {
        return request(app)
          .get('/people')
          .then(res => {
            expect(res.body).toHaveLength(0);
          });
      });
  });

  it('testing create person', () => {
    return request(app)
      .post('/people')
      .send({ name: 'jared', age: 22, footwear: 'heels' })
      .then(res => {
        expect(res.body).toEqual({ name: 'jared', age: 22, footwear: 'heels', _id: expect.any(String) });
      });
  });

  it('gets a list of all people', () => {
    return request(app)
      .get('/people')
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets a person by id', () => {
    return People.create({ name: 'patty', title: 'mom' })
      .then(person => {
        return request(app)
          .get(`/people/${person._id}`);
      })
      .then(results => {
        expect(results.body).toEqual({ name: 'patty', title: 'mom', _id: expect.any(String) });
      });
  });

  it('gets a person by id and updates object', () => {
    return People.create({ name: 'patty', title: 'mom' })
      .then(person => {
        return request(app)
          .put(`/people/${person._id}`)
          .send({ name: 'pattie', title: 'mom' })
          .then(res => {
            expect(res.body).toEqual({ name: 'pattie', title: 'mom', _id: expect.any(String) });
          });
      });
  });
});
