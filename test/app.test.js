const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/models/People');

describe('app routes', () => {
    afterEach(() => {
        return People.drop();
    });

    it('creates a person with the /people route', () => {
        return request(app)
            .post('/people')
            .send({ name: 'test' })
            .then(response => {
                expect(response.body).toEqual({
                    name: 'test',
                    _id: expect.any(String)
                });
            });
    });
});
