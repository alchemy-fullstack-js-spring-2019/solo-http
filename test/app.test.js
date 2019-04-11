const request = require('supertest');
const app = require('../lib/app');
const app2 = require('../lib/jsonapp');

describe('app routes', () => {
    it('responds to the birthday route', () => {
        return request(app)
            .get('/birthday')
            .then(res => {
                expect(res.text).toEqual('Happy birthday');
            });
    });
    it('app2 responds to the tester route', () => {
        return request(app2)
            .get('/tester')
            .then(res => {
                expect(JSON.parse(res.text)).toEqual({ testing: 123 });
            });
    });
});
