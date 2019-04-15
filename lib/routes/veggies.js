const Veggie = require('../models/Veggies');

function post(req, res) {
  Veggie
    .create({ type: req.body.type, color: req.body.color })
    .then(veggie => res.send(veggie));
}

const methods = {
  post
};

module.exports = (req, res) => {
  methods[req.method.toLowerCase()](req, res);
};

