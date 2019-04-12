const request = require('superagent');

function findCharacter(id) {
  return request
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => ({
      name: res.body.name,
      status: res.body.status,
      species: res.body.species
    }));
}

module.exports = {
  findCharacter
};
