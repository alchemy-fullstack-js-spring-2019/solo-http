const http = require('http');
const { parse } = require('url');
const bodyParser = require('../body-parser');
const People = require('../models/People');

const rickNMorty = http.createServer((req, res) => {
    res.send = json => res.end(JSON.stringify(json));

    const url = parse(req.url, true);

    res.send = obj => res.end(JSON.stringify(obj));
    if(url.pathname === '/people' && req.method === 'POST') {
        bodyParser(req)
            .then(json => {
                return People.create({
                    name: json.name,
                    age: json.age,
                    color: json.color
                });
            })
            .then(createdPerson => res.send(createdPerson));
    }
});

module.exports = {
    rickNMorty
};
