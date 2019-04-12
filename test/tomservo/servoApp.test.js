const request = require('supertest');
const app = require('../../lib/tomservo/servoApp.js');

describe('app routes', () => {
  it('responds to birthday route', () => {
    return request(app)
      .get('/birthday')
      .query({ name: 'Happy Birthday, Tom Servo!' })
      .then(res => {
        expect(res.text).toEqual('Happy Birthday, Tom Servo!');
      });
  });
  it('responds to tomorrow route', () => {
    return request(app)
      .get('/tomorrow')
      .then(res => {
        expect(res.body).toEqual('Tomorrow, tomorrow, Tom Servo...');
      });
  });
  it('responds to tomorrow/birthday route', () => {
    return request(app)
      .get('/tomorrow/birthday')
      .then(res => {
        expect(res.text).toEqual('Tomorrow Tom Servos birthday! Its my birthday too, yeah!');
      });
  });
  it('responds to tester route', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.text).toEqual('Testing 123');
      });
  });
  it('responds to any null/not found route', () => {
    return request(app)
      .get('/badRequest')
      .then(res => {
        expect(res.text).toEqual('404: Resource Not Found');
      });
  });
  it('responds to / route', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual('This is the Servo Home Page');
      });
  });
});
