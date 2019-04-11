const request = require('supertest');
const app = require('../lib/app');

describe('app routes', ()=> {
    it('responds to the bday route', ()=> {
        return request(app)
            .get('/birthday')
            .then(res => {
                expect(res.text).toEqual('happy birthday!');
            });
    });
    it('responds to tester route', ()=> {
        return request(app)
            .get('/tester')
            .then(res => {
                expect(res.body).toEqual({ testing: 123 });
            });
    });
    it('responds to query string', ()=> {
        return request(app)
            .get('/you')
            .query({ name: 'emily' })
            .then(res => {
                expect(res.text).toEqual('hi there emily');
            });
    });
});
