const request = require('supertest');
const app = require ('../lib/app');
const People = require('../lib/models/people');

describe('app routes', () => {
  afterEach(() => {
    return People.drop();
  });

  it('creates a perfson with /peope;', ()=>{
    return request(app)
      .post('/people')
      .send({ name: 'test' })
      .then(res=>
      {   
        return expect(res.body).toEqual({ name:'test', _id: expect.any(String) });
      }
      );
  });
  it('it finds a user with id', ()=>{
    return request(app)
      .post('/people/')
      .send({ name: 'test' })
      .then((res=>{
        return request(app)
          .get(`/people/?id=${res.body._id}`);
      }))
      .then(foundPerson=>{
        expect(foundPerson.body).toEqual({ name: 'test', _id: expect.any(String) });
      });
  });
  it('finds all users', ()=>{
    return request(app)
      .post('/people')
      .send({ name:'jimbob' })
      .then(()=>{
        return request(app)
          .get('/people')
          .then(people=>{
            expect(people.body).toContainEqual({ name:'jimbob', _id: expect.any(String) });
          });
      });
  });
  it('fins a person and updates', ()=>{
    return request(app)
      .post('/people')
      .send({ name:'Wrong Name' })
      .then((newPerson)=>{
        return request(app)
          .put(`/people/?id=${newPerson.body._id}`)
          .send({ name: 'Right Name' })
          .then(res=>{
            return expect(res.body).toEqual({ name:'Right Name', _id: expect.any(String) });
          });
          
      });
  });
});

