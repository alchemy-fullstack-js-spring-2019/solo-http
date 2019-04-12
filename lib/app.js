const http = require('http');
const { parse } = require('url');
const bodyParser = require('./body-parser');
const People = require('./models/People');

const app = http.createServer((req, res)=> {
    res.setHeader('content-type', 'text/html');
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
            .then(createdPerson => res.send(createdPerson));
    } 
});

module.exports = app;
