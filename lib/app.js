const http = require('http');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const People = require('./models/People');
const routes = require('./routes/people');
// const notes = {};
const app = http.createServer((req, res) => {
    res.send = json => res.end(JSON.stringify(json));

    const withIdPattern = /\/people\/(?<id>[\w-]*)/;
    
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
    else if(withIdPattern.test(url.pathname) && req.method === 'GET') {
        const id = url.pathname.match(withIdPattern).groups.id;
        People.findById(id)
            .then(person => res.send(person));
    }
    else if(withIdPattern.test(url.pathname) && req.method === 'PUT') {
        const id = url.pathname.match(withIdPattern).groups.id;
        bodyParser(req)
            .then(body => {
                People.findByIdAndUpdate(id, { name: body.name })
                    .then((updatedPerson) => res.send(updatedPerson));
            });
    }
    else if(withIdPattern.test(url.pathname) && req.method === 'DELETE') {
        const id = url.pathname.match(withIdPattern).groups.id;
        People.findByIdAndDelete(id)
            .then(result => res.send(result));
    }

});

module.exports = app;

