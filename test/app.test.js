const request = require('supertest');
const app = require('../lib/app');
const app2 = require('../lib/jsonapp');
const app3 = require('../lib/queryapp');
const rmapp = require('../lib/services/rmapp');

//jest.mock('../lib/services/rmapp.js');

describe('app routes', () => {
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
});
