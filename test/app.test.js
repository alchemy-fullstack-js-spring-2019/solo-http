const request = require('supertest');
const app = require('../lib/app');


describe('people creates a new person', ()=> {
    it('POST/people creates a new person in the database', ()=> {
        return request(app)
            .post('/people')
            .send({ name: 'emily', age: 35, color: 'green' })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'emily',
                    age: 35,
                    color: 'green',
                    _id: expect.any(String)
                });
            });
    });
});
