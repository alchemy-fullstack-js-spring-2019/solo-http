const request = require('supertest');
const peopleApp = require('../lib/people-app');
const People = require('../lib/models/People');
const mkdirp = require('mkdirp');

describe('People route', () => {
  beforeAll(done => {
    mkdirp('./data/people', done);
  });
  afterEach(() => {
    return People.drop();
  });

  it('creates a person with /people route', () => {
    return request(peopleApp)
      .post('/people')
      .send({ name: 'tester' }) // the data you want to send
      .then(res => {
        expect(res.body).toEqual({
          name: 'tester',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of people with the /people route', () => {
    return People.create({
      name: 'tester'
    })
      .then(() => {
        return request(peopleApp)
          .get('/people');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toContainEqual({
          name: 'tester',
          _id: expect.any(String)
        });
      });
  });

  it('gets a person by id', () => {
    return People.create({
      name: 'tester'
    })
      .then(createdPerson => {
        return request(peopleApp)
          .get(`/people/${createdPerson._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'tester',
          _id: expect.any(String)
        });
      });
  });  

  it('updates a person by id', () => {
    return People.create({
      name: 'tesstter'
    })
      .then(createdPerson => {
        return request(peopleApp)
          .put(`/people/${createdPerson._id}`)
          .send({ name: 'tester' });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'tester',
          _id: expect.any(String)
        });
      });
  });  

  it('deletes a person by id', () => {
    return People.create({
      name: 'tester'
    })
      .then(createdPerson => {
        return request(peopleApp)
          .delete(`/people/${createdPerson._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });  
});
