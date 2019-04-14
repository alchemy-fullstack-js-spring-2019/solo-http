const People = require('../models/People');

function post(req, res) {
  return People 
    .create({ name: req.body.name })
    .then(person => res.send(person));
}

function get(req, res) {
  if(req.id) {
    People
      .findById(req.id)
      .then(person => res.send(person));  
  } else {
    People
      .find()
      .then(person => res.send(person));
  }
}

function put(req, res) {
  People  
    .findByIdAndUpdate(req.id, { name: req.body.name })
    .then(person => res.send(person));
}

function del(req, res) {
  People 
    .findByIdAndDelete(req.id)
    .then(result => res.send(result));
}

const methods = {
  post,
  get, 
  put, 
  delete: del
};

function people(req, res) {
  const lowerMethodCase = req.method.toLowerCase();
  const method = methods[lowerMethodCase];
  method(req, res);  
}

module.exports = people;
