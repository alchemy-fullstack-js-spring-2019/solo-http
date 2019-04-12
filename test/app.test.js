const request = require('supertest');
const app = require('../lib/app');

jest.mock()

describe('app routes', () => {
//   it('responds to the birthday route', () => {
//     return request(app)
//       .get('/birthday')
//       .query({ name: 'me' })
//       .then(res => {
//         expect(res.text).toEqual('happy birthday');
//       });
//   });
  it('returns a character', () => 
  {
    return request(app)
      .get('/character/1')
      .then(res => console.log(res.body));
      
  });
});
