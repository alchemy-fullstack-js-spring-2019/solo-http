const People = require('../models/People');

function post(req, res) {
  People.create({ name: req.body.name })
    .then(createdPerson => res.end(JSON.stringify(createdPerson)));
}

const methods = {
  post
};

module.exports = (req, res) => {
  const method = methods[req.methods.toLowerCase()];
  method(req, res);
};
