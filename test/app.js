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
    it('gets a list of people with the /people route', () => {
        return People.create({
            name: 'Brain'
        })
            .then(() => {
                return request(app)
                    .get('/people');
            })
            .then(response => {
                expect(response.body).toHaveLength(1);
                expect(response.body).toContainEqual({
                    name: 'Brain',
                    _id: expect.any(String)
                });
            });
    });
    it('gets a person by id', () => {
        return People.create({ name: 'Colin' })
            .then(person => {
                return request(app)
                    .get(`/people/${person._id}`);
            })
            .then(response => {
                expect(response.body).toEqual({
                    name: 'Colin',
                    _id: expect.any(String)
                });
            });
    });
    it('updates a person by id', () => {
        return People.create({ name: 'Test' })
            .then(person => {
                return request(app)
                    .put(`/people/${person._id}`)
                    .send({ name: 'Brian' });
            })
            .then(response => {
                expect(response.body).toEqual({
                    name: 'Brian'
                });
            });
    });
    it('deletes a person by id', () => {
        return People.create({ name: 'harver'})
            .then(person => {
                return request(app)
                    .delete(`/people/${person._id}`); 
            })
            .then(response => {
                expect(response.body).toEqual({
                    deleted: 1
                });
            });
    });
});
