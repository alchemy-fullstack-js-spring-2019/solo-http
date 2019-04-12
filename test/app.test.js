const app = require('../lib/app');
// const app2 = require('../lib/app2');
const request = require('supertest');
const People = require('../lib/models/People');

//Create
//Read
//Update
//Delete

// describe('app test', () => {
//   it('tests the paths of a request', () => {
//     return request(app)
//       .get('/tester')
//       .then(res => {
//         expect(res.body).toEqual({ 'firstName': 'mister', 'lastName': 'Testy' });
//       });
//   });

//   it('tests query strings', () => {
//     const name = 'ben';
//     return request(app)
//       .get(`/you?name=${name}`)
//       .then(res => {
//         expect(res.body).toEqual({ 'text': 'hi there ben' });
//       });
//   });

//   it('tests gets rick and morty characters', () => {
//     return request(app2)
//       .get('/character/1')
//       .then(res => {
//         expect(res.body).toEqual({
//           name: 'Rick Sanchez',
//           status: 'Alive',
//           species: 'Human'
//         });
//       });
//   });
// });

describe('person creation', () => {
  afterEach(() => {
    return People.drop();
  });
  it('creates a person with /people', () => {
    return request(app)
      .post('/people')
      .send({ name: 'ben', age: 36, color: 'blue' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'ben',
          age: 36,
          color: 'blue',
          _id: expect.any(String)
        });
      });
  });
  it('gets a list of all people from /people', () => {
    return People.create({
      name: 'tiny'
    })
      .then(() => {
        return request(app)
          .get('/people');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toContainEqual({ name: 'tiny', _id: expect.any(String) });
      });
  // it('gets a certain person from a list using /people/:id', () => {
  //   return request(app)
  //   const id = 
  //   .get('/people/')
  // });
  });
});
