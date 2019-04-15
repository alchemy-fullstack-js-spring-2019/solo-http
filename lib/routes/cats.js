const Cat = require('../models/Cats');

function post(req, res) {
  Cat
    .create({ name: req.body.name, color: req.body.color })
    .then(cat => res.send(cat));
}

const methods = {
  post
};

module.exports = (req, res) => {
  methods[req.method.toLowerCase()](req, res);
};
