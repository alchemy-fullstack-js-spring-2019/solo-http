const People = require('../models/People');

function post(req, res) {
  return People 
    .create({ name: req.body.name })
    .then(person => res.send(person));
}


const methods = {
  post
};

function people(req, res) {
  const lowerMethodCase = req.method.toLowerCase();
  const method = methods[lowerMethodCase];
  method(req, res);  
}

module.exports = people;
