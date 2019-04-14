const request = require('supertest');
const app = require('../lib/peopleApp');
const People = require('../lib/models/People');


describe('app routes', () => {
  afterEach(() => {
    return People.drop();
  });

  it('POSTS/creates a person to /people route', () => {
    return request(app)
      .post('/people')
      .send({ name: 'risa' })
      .then(res => {
        expect(res.body).toEqual({ name: 'risa', _id: expect.any(String)});
      });
  });
  // it('gets a list of people with the /people route', () => {
  //   return People.create({
  //     name: 'risa',
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
  //   return People.create({ name: 'risa', age: 27, pronouns: 'she/her' })
  // });
});

