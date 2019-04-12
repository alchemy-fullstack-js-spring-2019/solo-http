const People = require('../models/People');

function post(req, res) {
  return People.create({ name: req.body.name, age: req.body.age, color: req.body.color })
    .then(person => res.send(person));
}

function get(req, res) {
  if(req.id) {
    People.findById(req.id)
      .then(person => res.send(person));
  } else {
    People.find()
      .then(people => res.send(people));
  }
}

function put(req, res) {
  People.findByIdAndUpdate(req.id, { name: req.body.name, age: req.body.age, color: req.body.color })
    .then(newPerson => res.send(newPerson));
}

// function delete() {

// }

const methods = {
  post,
  get,
  put,
  // delete
};

module.exports = (req, res) => {
  methods[req.method.toLowerCase()](req, res);
};
