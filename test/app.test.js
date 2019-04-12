// const request = require('supertest');
// const app = require('../lib/app');

// jest.mock('../lib/service/rick-morty.js');

// describe('app routes', () => {
//   it('responds to the character/:ID', () => {
//     return request(app)
//       .get('/character/2')
//       .query({ name: 'ryan' })
//       .then(res => {
//         expect(res.body).toEqual(({
//           name: 'Ryan',
//           status: 'Alive',
//           species: 'Human'
//         }));
//       });
//   });
// });
