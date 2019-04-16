const request = require('superagent');

function getCharacter(id) {
    return request
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => ({
            name: response.body.name,
            status: response.body.status,
            species: response.body.species
        }));
}

module.exports = {
    getCharacter
};
