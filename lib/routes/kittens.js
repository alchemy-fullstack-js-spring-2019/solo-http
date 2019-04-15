const Kittens = require('../models/Kittens');

function post(req, res) {
  return Kittens
    .create({ 
      name: req.body.name,
      age: req.body.age,
      color: req.body.color
    })
    .then(kitty => res.end(JSON.stringify(kitty)));
}

function get(req, res) {
  if(req.id) {
    Kittens
      .findById(req.id)
      .then(kitten => res.send(kitten));
  } else {
    Kittens
      .find()
      .then(kittens => res.send(kittens));
  }
}

function put(req, res) {
  Kittens
    .findByIdAndUpdate(req.id, { name: req.body.name })
    .then(kitten => res.send(kitten));
}

function del(req, res) {
  Kittens
    .findByIdAndDelete(req.id)
    .then(result => res.send(result));
}

const methods = {
  post,
  get,
  put,
  delete: del
};

module.exports = (req, res) => {
  methods[req.method.toLowerCase()](req, res);
};
