const request = require('supertest');
const { app } = require('../lib/app.js');
const { rick } = require('../lib/rick.js');

describe('Test the root path', () => {
  test('It should respond to birthday', () => {
    return request(app).get('/birthday')
      .then(res => {
        expect(res.text).toEqual('Happy Birthday');
      });
  });

  test('It should respond to tester', () => {
    return request(app).get('/tester')
      .then(res => {
        expect(res.text).toEqual('{ testing: 123 }');
      });
  });

  test('Query shold return a name', () => {
    return request(app).get('/you?name=dude')
      .then(res => {
        expect(res.text).toEqual('{ text: hi there dude }');
      });
  });

  
});

describe('Test rick return', () => {
  test('It should return characters', () => {
    return request(rick).get('/character/?id=15')
      .then(res => {
        expect(JSON.parse(res.text)).toEqual({
          name: 'Alien Rick',
          species: 'Alien',
          gender: 'Male'
        });
      });
  });
});

