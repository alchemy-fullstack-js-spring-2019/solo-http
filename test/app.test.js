const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
    it('responds to the birthday path', () => {
        return request(app)
            .get('/birthday')
            .then(response => {
                expect(response.text).toEqual('Birthday Birthday');
            });
    });
    it('responds to json app', () => {
        return request(app)
            .get('/tester')
            .then(response => {
                expect(response.body).toEqual({ testing: 123 });
            });
    });
    it.only('query string', () => {
        return request(app)
            .get('/you')
            .query({ name: 'Colin' })
            .then(response => {
                expect(response.body.text).toEqual('hi there Colin');
            });
    });
});
