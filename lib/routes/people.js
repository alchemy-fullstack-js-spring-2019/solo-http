const People = require('../models/People');
const parseBody = require('../parse-body');

module.exports = (req, res) => {
  applyMethod(req)
    .then(res.send);
};

function applyMethod(req) {
  switch(req.method) {
    case 'GET':
      return req.id ? People.findById(req.id) : People.find();
    case 'POST':
      return parseBody(req)
        .then(person => People.create({
          name: person.name,
          age: person.age,
          color: person.color
        }));
    case 'PUT':
      return parseBody(req)
        .then(person => People.findByIdAndUpdate(req.id, {
          name: person.name,
          age: person.age,
          color: person.color
        }));
    case 'DELETE':
      return People.findByIdAndDelete(req.id);
  }
}
