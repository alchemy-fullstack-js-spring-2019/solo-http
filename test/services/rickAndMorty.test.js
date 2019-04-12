const request = require('supertest');
const { rickNMorty } = require('../../lib/services/rickAndMorty.js');

jest.mock('../lib/services/rickAndMortyApi.js');

describe('app routes', () => {
    it('creates a person with /people', () => {
        return request(rickNMorty)
            .post('/people')
            .send({ name: 'ryan', age: 32, color: 'red' })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'ryan',
                    age: 32,
                    color: 'red',
                    _id: expect.any(String)
                });
            });
    });

});
