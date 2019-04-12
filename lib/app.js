const http = require('http');
const { parse } = require('url');
const bodyParser = require('./body-parser');
const People = require('./models/People');

const app = http.createServer((req, res)=> {
    res.setHeader('Content-Type', 'application/json');
    const url = parse(req.url, true);
    res.send = json => res.end(JSON.stringify(json));

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
    else if(url.pathname === '/people' && req.method === 'GET') {
        People.find()
            .then(people => res.send(people));
    }
    else if(url.pathname === '/people/' && req.method === 'GET') {
        const id = url.pathname.split('/')[2];
        People.findById(id)
            .then(person => res.send(person));
    }
    else if(url.pathname.includes('/people/') && req.method === 'PUT') {
        const id = url.pathname.split('/')[2];
        bodyParser(req)
            .then(body => {
                return People.findByIdAndUpdate(id, { name: body.name });
            })
            .then(person => res.send(person));
    }
        
});

module.exports = app;
