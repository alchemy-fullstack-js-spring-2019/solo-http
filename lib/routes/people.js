const People = require('../models/People');

function post(req, res) {
    People.create({ name: req.body.name })
        .then(person => res.end(JSON.stringify(person)));
}

const methods = {
    post
};

module.exports = (req, res) => {
    const method = methods[req.methods.toLowerCase()];
    method(req, res);
}
