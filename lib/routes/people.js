const People = require('../models/People');

function post(req, res) {
  People.create({ name: req.body.name })
    .then(person => res.end(JSON.stringify(person)));
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
  People.findByIdAndUpdate(req.id, { name: req.body.name })
    .then(updated => res.send(updated));
}

function del(req, res) {
  People.findByIdAndDelete(req.id)
    .then(result => res.send(result));
}

const methods = {
  post, 
  get, 
  put, 
  delte: del
};

module.exports = (req, res) => {
  const lowerMethod = req.methods.toLowerCase();
  const method = methods[lowerMethod];
  method(req, res);

  methods[req.methods.toLowerCase()](req, res);
};
