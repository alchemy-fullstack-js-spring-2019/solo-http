const http = require('http');
const { parse } = require('url');
const bodyParser = require('../body-parser');
const People = require('../models/People');

const rickNMorty = http.createServer((req, res) => {
    res.send = json => res.end(JSON.stringify(json));

    const url = parse(req.url, true);

    console.log(req.url);
    res.send = obj => res.end(JSON.stringify(obj));
    // console.log('OBJECT', obj);
    if(url.pathname === '/people' && req.method === 'POST') {
        bodyParser(req)
            .then(json => {
                return People.create({
                    name: json.name,
                    age: json.age,
                    color: json.color
                });
            })
            .then(createdPerson => {
                res.setHeader('Content-Type', 'application/json');
                res.send(createdPerson);
            });
    } else if(url.pathname === '/people' && req.method === 'GET') {
        return People.find()
            .then(peopleList => {
                res.setHeader('Content-Type', 'application/json');
                console.log(peopleList);
                res.send(peopleList);
            });
    } else if(url.pathname.includes('/people/') && req.method === 'GET') {
        const id = url.pathname.split('/')[2];
        People.findById(id)
            .then(person => {
                console.log(person);
                res.send(person);
            });
    }
});

module.exports = {
    rickNMorty
};
