const bodyParser = require('./body-parser');
const People = require('./models/People');
const Dogs = require('./models/Dogs');
const resources = {
  people: People,
  dogs: Dogs
};

function pathAndId(res, req, match) {
  const path = match.groups.path;
  switch(req.method) {
    case 'GET':
      resources[path].findById(match.groups.id)
        .then(item => res.send(item));
      break;
    case 'DELETE':
      resources[path].findByIdAndDelete(match.groups.id)
        .then(item => res.send(item));
      break;
    case 'PUT':
      bodyParser(req)
        .then(json => resources[path].findByIdAndUpdate(match.groups.id, json))
        .then(item => res.send(item));
      break;
    default: 
      res.send({ message: 'errors...' });  
  } 
}


module.exports = pathAndId;
