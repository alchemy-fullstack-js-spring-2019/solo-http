const request = require('supertest');
const app = require ('../lib/json.app');

describe.only('app routes', ()=>{
  it('responds to the bday route', () => {
    return request(app)
      .get('/tester')
      .then(res=>{
        expect(JSON.parse(res.text)).toEqual({ testing: 123 });
      });
  });
});
