const request = require('supertest');
const app = require('../lib/app.js');
const Kittens = require('../lib/models/Kittens');


describe('app routes', () => {
  afterEach(() => {
    return Kittens.drop();
  });

  test('it creates a kitten with the /kittens route (POST)', () => {
    const kitten = {
      name: 'fluffy',
      age: '5',
      color: 'black'
    };
    return request(app)
      .post('/kittens')
      .send(kitten)
      .then(res => {
        expect(res.body).toEqual({ 
          name: 'fluffy',
          age: '5',
          color: 'black', 
          _id: expect.any(String) 
        });
      });
  });

  test('gets a list of all kittens with /kittens', () => {
    return Kittens.create({
      name: 'tester'
    })
      .then(() => {
        return request(app)
          .get('/kittens');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  test('gets a person by id', () => {
    return Kittens.create({
      name: 'tester'
    })
      .then(kitten => {
        return request(app)
          .get(`/kittens/${kitten._id}`);
      })
      .then(res => {
        expect (res.body).toEqual({
          name: 'tester', 
          _id: expect.any(String) 
        });
      });
  });

  test('it updates kitten by id', () => {
    return Kittens.create({ name: 'testr' })
      .then(kitten => {
        return request(app)
          .put(`/kittens/${kitten._id}`).send({ name: 'fluffy' })
          .then(res => {
            expect(res.body).toEqual({
              name: 'fluffy',
              _id: expect.any(String)
            });
          });
      });
  });

  test('Deletes a thing by ID', () => {
    return Kittens.create({ name: 'test' })
      .then(kitten => {
        return request(app)
          .delete(`/kittens/${kitten._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});

