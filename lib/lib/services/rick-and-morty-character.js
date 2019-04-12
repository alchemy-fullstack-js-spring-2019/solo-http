const req = require('superagent');

function findCharacter(id) {
  return req
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => ({
      name: res.body.name,
      status: res.body.status,
      species: res.body.species
    }));
}
module.exports = findCharacter;
