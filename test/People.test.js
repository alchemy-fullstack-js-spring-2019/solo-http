const app = require('../lib/app');
const request = require('supertest');

describe('', () => {
    it('', () => {
        return request(app)
            .post('/people')
            .send({ name: 'jared', age: 72, color: 'glitter' })
            .then(res => {
                expect(res.body).toEqual({ name: 'jared', age: 72, color: 'glitter', _id: expect.any(String) });
            });
    });
});
