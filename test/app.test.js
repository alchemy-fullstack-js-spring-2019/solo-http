const request = require('supertest');
const app = require ('../lib/app');

describe('app routes', ()=>{
  it('responds to the bday route', ()=>{
    return request(app)
      .get('./birthday')
      .then(res=>{
        expect(res.text).toEqual('Happy Birthday');
      });
  });
});
