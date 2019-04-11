const request = require('supertest');
const app = require ('../lib/app');

describe.only('app routes', ()=>{
  it('responds to the bday route', () => {
    return request(app)
      .get('/tester')
      .then(res=>{
        expect(res.text).toEqual('testing123');
      });
  });
});
