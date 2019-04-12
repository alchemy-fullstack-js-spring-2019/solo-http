const request = require('supertest');
const { rickNMorty } = require('../../lib/services/rickAndMorty.js');

describe('Test rick return', () => {
    test('It should return characters', () => {
        return request(rickNMorty).get('/character/?id=1')
            .then(res => {
                expect(JSON.parse(res.text)).toEqual({
                    name: 'Rick Sanchez',
                    species: 'Human',
                    status: 'Alive'
                });
            });
    });
});
