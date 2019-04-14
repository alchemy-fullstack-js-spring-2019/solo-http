const Tasks = require('../models/Tasks');
const notFound = require('./notFound');

function post(req) {
  return Tasks
    .create({ name: req.body.name, priority: req.body.priority, description: req.body.description });
}

function get(req) {
  if(req.id) {
    return Tasks
      .findById(req.id);
  } else {
    return Tasks
      .find();
  }
}

function put(req) {
  return Tasks
    .findByIdAndUpdate(req.id, { name: req.body.name, priority: req.body.priority, description: req.body.description });
}

function del(req) {
  return Tasks
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
