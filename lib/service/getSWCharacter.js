const request = require('superagent');

function getSWCharacter(id) {
  return request
    .get(`https://swapi.co/api/people/${id}`)
    .then(res => res.body)
    .then(swCharacter => {
      return {
        name: swCharacter.name,
        height: swCharacter.height,
        mass: swCharacter.mass,
        hairColor: swCharacter.hairColor,
        birthYear: swCharacter.birthYear
      };
    });
}

module.exports = {
  getSWCharacter
};
