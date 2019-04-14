const peopleApp = require('../lib/peopleApp');
const People = require('../lib/models/People');
// const mkdirp = require('mkdirp');
// const rimraf = require('rimraf');
// const uuid = require('uuid/v4');
const request = require('supertest');


describe('app routes', () => {
  // afterEach(() => {
  //   return People.drop();
  // });

  it('POSTS/creates a person to /people route', () => {
    return request(peopleApp)
      .post('/people')
      .send({ name: 'risa' })
      .then(res => {
        expect(res.body).toEqual({ 
          name: 'risa',
          _id: expect.any(String)
        });
      });
  });

  // it('gets a list of people with the /people route', () => {
  //   return People.create({
  //     name: 'leooo',
  //   })
  //     .then(() => {
  //       return request(app)
  //         .get('/people');
  //     })
  //     .then(res => {
  //       expect(res.body).toHaveLength(1);
  //       expect(res.body).toContainEqual({
  //         name: 'risa',
  //         _id: expect.any(String)
  //       });
  //     });
  // });
  // it('GETS a person by id', () => {
  //   return People.create({ name: 'risa' })
  //     .then(createdPerson => {
  //       return request(app)
  //         .get(`/people/${createdPerson_id}`);
  //     });
  // });
});

