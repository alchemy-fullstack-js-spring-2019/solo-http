const request = require('superagent');

function getCharacter(id) {
  return request.get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.body)
    .then(results => {
      return {
        name: results.name,
        status: results.status,
        species: results.species
      };
    });
}

module.exports =  { getCharacter };
