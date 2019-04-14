const People = require('../models/People');
const notFound = require('./notFound');

function post(req) {
  return People
    .create({ name: req.body.name, age: req.body.age, color: req.body.color });
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
  return People
    .findByIdAndUpdate(req.id, { name: req.body.name, age: req.body.age, color: req.body.color });
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
