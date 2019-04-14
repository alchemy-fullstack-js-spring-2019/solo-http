const People = require('../models/People');

function post(request, response) {
    return People
        .create({ name: request.body.name })
        .then(person => response.send(person));
}

function get(request, response) {
    if(request.id) {
        People
            .findById(request.id)
            .then(person => response.send(person));
    } else {
        People
            .find()
            .then(people => response.send(people));
    }
}

function put(request, response) {
    People
        .findByIdAndUpdate(request.id, { name: request.body.name })
        .then(person => response.send(person));
}

function del(request, response) {
    People
        .findByIdAndDelete(request.id)
        .then(result => response.send(result));
}

const methods = {
    post,
    get,
    put,
    delete: del
};

function people(request, response) {
    const lowerMethod = request.method.toLowerCase();
    const method = methods[lowerMethod];
    method(request, response);
}

module.exports = people;
