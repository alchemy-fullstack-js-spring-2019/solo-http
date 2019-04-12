const app = require('../lib/app');
const request = require('supertest');
const People = require('../lib/models/People');

describe('app routes', () => {
    afterAll(() => {
        return People.drop();
    });
    it('creates', () => {
        return request(app)
            .post('/people')
            .send({ name: 'jared', age: 72, color: 'glitter' })
            .then(res => {
                expect(res.body).toEqual({ name: 'jared', age: 72, color: 'glitter', _id: expect.any(String) });
            });
    });

    it('gets a list of all people', () => {
        return request(app)
            .get('/people')
            .then(res => {
                expect(res.body).toHaveLength(1);
            });  
    });

    it('gets a person by id', () => {
        People.create({ name: 'tester', age: 100, color: 'blue' })
            .then(createdPerson => {
                return request(app)
                    .get(`/people/${createdPerson._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'tester',
                    age: 100,
                    color: 'blue',
                    _id: expect.any(String)
                });
            });

    })
});
