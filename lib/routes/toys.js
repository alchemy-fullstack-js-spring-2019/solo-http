const Toys = require('../models/Toys');

function post(req, res) {
  return Toys
    .create({ type: req.body.type, color: req.body.color })
    .then(toy => res.send(toy));
}

function get(req, res) {
  if(req.id) {
    Toys
      .findById(req.id)
      .then(toy => res.send(toy));
  } else {
    Toys
      .find()
      .then(toy => res.send(toy));
  }
}


const methods = {
  post, 
  get
};

module.exports = (req, res) => {
  methods[req.method.toLowerCase()](req, res);
};
