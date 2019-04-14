const People = require('../models/People');
const notFound = require('./notFound');
const { getSWCharacter } = require('../service/getSWCharacter');

function post(req) {
  let favoriteCharacter = {};
  if(req.body.favoriteCharacterId) {
    return getSWCharacter(req.body.favoriteCharacterId)
      .then(responseFromSWAPI => {
        favoriteCharacter = responseFromSWAPI;
        return Promise.resolve(favoriteCharacter);
      })
      .then(favoriteCharacter => {
        return People.create({
          name: req.body.name, 
          age: req.body.age, 
          color: req.body.color, 
          favoriteCharacterId: req.body.favoriteCharacterId, 
          favoriteCharacter 
        });
      });
  } else {
    return People
      .create({
        name: req.body.name, 
        age: req.body.age, 
        color: req.body.color, 
        favoriteCharacterId: null, 
        favoriteCharacter 
      });
  }

}

function get(req) {
  if(req.id) {
    return People
      .findById(req.id);
  } else {
    return People
      .find();
  }
}

function put(req) {
  let favoriteCharacter = {};
  if(req.body.favoriteCharacterId) {
    return People
      .findById(req.id)
      .then(personToReplace => {
        if(personToReplace.favoriteCharacterId === req.body.favoriteCharacterId) {
          return People.findByIdAndUpdate(req.id, { 
            name: req.body.name, 
            age: req.body.age, 
            color: req.body.color, 
            favoriteCharacterId: req.body.favoriteCharacterId, 
            favoriteCharacter: personToReplace.favoriteCharacter
          });
        }

        return getSWCharacter(req.body.favoriteCharacterId)
          .then(favoriteCharacter => {
            return People
              .findByIdAndUpdate(req.id, {
                name: req.body.name, 
                age: req.body.age, 
                color: req.body.color,
                favoriteCharacterId: req.body.favoriteCharacterId,
                favoriteCharacter
              });
          });
      });
  }
  
  return People
    .findByIdAndUpdate(req.id, { 
      name: req.body.name, 
      age: req.body.age, 
      color: req.body.color, 
      favoriteCharacterId: null, 
      favoriteCharacter 
    });
}

function del(req) {
  return People
    .findByIdAndDelete(req.id);
}

const methods = {
  post,
  get,
  put,
  delete: del
};

module.exports = (req, res) => {
  methods[req.method.toLowerCase()](req)
    .then(result => res.send(result))
    .catch(() => {
      notFound(req, res);
    });
};
