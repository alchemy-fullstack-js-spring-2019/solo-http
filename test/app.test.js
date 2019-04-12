const request = require('supertest');
const app = require('../lib/app');
const app2 = require('../lib/jsonapp');
const app3 = require('../lib/queryapp');
const rmapp = require('../lib/services/rmapp');
const People = require('../lib/models/People');

//jest.mock('../lib/services/rmapp.js');

describe('app routes', () => {
    afterAll(() => {
        return People.drop();
    });

    // tests old version of app
    // it('responds to the birthday route', () => {
    //     return request(app)
    //         .get('/birthday')
    //         .then(res => {
    //             expect(res.text).toEqual('Happy birthday');
    //         });
    // });

    it('app2 responds to the tester route', () => {
        return request(app2)
            .get('/tester')
            .then(res => {
                expect(JSON.parse(res.text)).toEqual({ testing: 123 });
            });
    });

    it('app3 responds to the name query', () => {
        return request(app3)
            .get('/you?name=ryan')
            .then(res => {
                expect(JSON.parse(res.text)).toEqual({ text: 'hi there ryan' });
            });
    });

    it('rmapp responds to the name query', () => {
        return request(rmapp)
            .get('/character/12')
            .then(res => {
                expect(JSON.parse(res.text)).toEqual({ 
                    'name': 'Alexander',
                    'status': 'Dead',
                    'species': 'Human' 
                });
            });
    });

    it('app creates a person with POST method', () => {
        //reminder to self: request is supertest
        return request(app)
            .post('/people')
            .send({ name: 'Bonnie', age: 32, color: 'red' })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'Bonnie',
                    age: 32, 
                    color: 'red',
                    _id: expect.any(String)
                });
            });
    });

    it('gets a list of all people with /people', () => {
        return request(app)
            .get('/people')
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });

    it('gets a person by id', () => {
        return People.create({ name: 'Bonnie', age: 32, color: 'red' })
            .then(createdPerson => {
                return request(app)
                    .get(`/people/${createdPerson._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'Bonnie',
                    age: 32, 
                    color: 'red',
                    _id: expect.any(String)
                });
            });
    });

    //     PUT /people/:id` updates a person with :id
    //   and returns the update
    it('updates a person by id', () => {
        return People.create({ name: 'Bonnie McNeil', age: 32, color: 'red' })
            .then(createdPerson => {
                return request(app)
                    .put(`/people/${createdPerson._id}`)
                    .send({ name: 'Bonnie B', age: 32, color: 'red' })
                    .then(res => {
                        expect(res.body).toEqual({
                            name: 'Bonnie B',
                            age: 32, 
                            color: 'red',
                            _id: expect.any(String)
                        });
                    });
            });
    });
});
