const http = require('http');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const People = require('./models/People');

// const notes = {};
const app = http.createServer((req, res) => {
    res.send = json => res.end(JSON.stringify(json));

    
    res.setHeader('Content-Type', 'application/json');

    const url = parse(req.url, true);
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
                res.send(createdPerson);
            });
    }
    else if(url.pathname === '/people' && req.method === 'GET') {
        People.find()
            .then(people => res.send(people));    
    }
    // else if(url.pathname.includes('/people/' )) {
    //     const id = url.pathname.match(withIdPattern).
    // }
    // else if(url.pathname === '/people/:id' && req.method === 'GET') {
    //     bodyParser(req)
    //         .then(json => {
    //             return People.findById(json.id);    
    //         })
    //         .then(results => res.send(results));
    // }
    // else if(url.pathname === '/people/:id' && req.method === 'PUT') {

    // }

});

module.exports = app;

