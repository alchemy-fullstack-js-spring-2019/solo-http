const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/models/People');


describe('app routes', () => {
  afterEach(() => {
    return People.drop();
  });

  test('it creates a person with the /people route (POST)', () => {
    const person = {
      name: 'cara',
      age: '35',
      color: 'black'
    };
    return request(app)
      .post('/people').send(person)
      .then(res => {
        expect(res.body).toEqual({ ...person, _id: expect.any(String) });
      });
  });

  test('gets a list of all people with /people', () => {
    return People.create({
      name: 'tester'
    })
      .then(() => {
        return request(app)
          .get('/people');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  test('gets a person by id', () => {
    return People.create({
      name: 'tester'
    })
      .then(person => {
        return request(app)
          .get(`/people/${person._id}`);
      })
      .then(res => {
        expect (res.body).toEqual({ name: 'tester', _id: expect.any(String) });
      });
  });

  test('it updates person by id', () => {
    return People.create({ name: 'testr' })
      .then(person => {
        return request(app)
          .put(`/people/${person._id}`).send({ name: 'cara' })
          .then(res => {
            expect(res.body).toEqual({
              name: 'cara',
              _id: expect.any(String)
            });
          });
      });
  });

  test('Deletes a thing by ID', () => {
    return People.create({ name: 'test' })
      .then(person => {
        return request(app)
          .delete(`/people/${person._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });



  // it('tester pathname resolves ', () => {
  //   return request(app).get('/tester')
  //     .then(res => expect(res.body).toEqual({ testing: '123' }));
  // });

  // it('resolves to object', () => {
  //   return request(app).get('/you?name=cara')
  //     .then(res => expect(res.body).toEqual({ text: 'hi there cara' }));
  // });
});

