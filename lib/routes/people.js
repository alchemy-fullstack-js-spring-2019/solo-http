const People = require('../models/People');
const parseBody = require('../parse-body');

module.exports = (req, res, id) => {
  applyMethod(req, id)
    .then(res.send);
};

function applyMethod(req, id) {
  switch(req.method) {
    case 'GET':
      return id ? People.findById(id) : People.find();
    case 'POST':
      return parseBody(req)
        .then(person => People.create({
          name: person.name,
          age: person.age,
          color: person.color
        }));
    case 'PUT':
      return parseBody(req)
        .then(person => People.findByIdAndUpdate(id, {
          name: person.name,
          age: person.age,
          color: person.color
        }));
    case 'DELETE':
      return People.findByIdAndDelete(id);
  }
}
