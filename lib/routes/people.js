const People = require('../models/People');
const parseBody = require('../parse-body');

function checkMethod(req, res, id) {
  switch(req.method) {
    case 'GET':
      (id ? People.findById(id) : People.find())
        .then(res.send);
      break;
    case 'POST':
      parseBody(req)
        .then(person => People.create({
          name: person.name,
          age: person.age,
          color: person.color
        }))
        .then(res.send);
      break;
    case 'PUT':
      parseBody(req)
        .then(person => People.findByIdAndUpdate(id, {
          name: person.name,
          age: person.age,
          color: person.color
        }))
        .then(res.send);
      break;
    case 'DELETE':
      People.findByIdAndDelete(id)
        .then(res.send);
  }
}

module.exports = { checkMethod };
