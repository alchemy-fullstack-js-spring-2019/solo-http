const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/models/People');


describe('app routes', () => {
  afterAll(() => {
    return People.drop();
  });

  test('it adds a person', () => {
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
    return request(app)
      .get('/people')
      .then(res => {
        expect(res.body).toHaveLength(1);
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

