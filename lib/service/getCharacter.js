const request = require('superagent');

function getCharacter(id) {
  return request.get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.body)
    .then(character => {
      return {
        name: character.name,
        status: character.status,
        species: character.species
      };
    });
}

module.exports = {
  getCharacter
};
