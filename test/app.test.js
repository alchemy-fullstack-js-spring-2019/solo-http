const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
    it('responds to the birthday path', () => {
        return request(app)
            .get('/birthday')
            .query({ name: 'herman' })
            .then(response => {
                expect(response.text).toEqual('Birthday Birthday');
            });
    });
});

