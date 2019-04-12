const People = require('../models/People');

function post(req, res) {
  return People.create({ name: req.body.name, age: req.body.age, color: req.body.color })
    .then(person => res.send(person));
}

// function get() {

// }

// function put() {

// }

// function delete() {

// }

const methods = {
  post,
  // get,
  // put,
  // delete
};

module.exports = (req, res) => {
  methods[req.method.toLowerCase()](req, res);
};
