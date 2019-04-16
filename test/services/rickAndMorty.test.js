const request = require('supertest');
const { rickNMorty } = require('../../lib/services/rickAndMorty');

describe('app routes', () => {
    // afterAll(() => {
    //     return People.drop();
    // });

    it('creates a person with /people', () => {
        return request(rickNMorty)
            .post('/people')
            .send({ name: 'ryan', age: 32, color: 'red' })
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.body).toEqual({
                    name: 'ryan',
                    age: 32,
                    color: 'red',
                    _id: expect.any(String)
                });
            });
    });
    it('returns a list of people', () => {
        return request(rickNMorty)
            .get('/people')
            .then(res => {
                console.log('Test forres', res.body);
                expect(res.body).toHaveLength(2);
            });
    });
});
