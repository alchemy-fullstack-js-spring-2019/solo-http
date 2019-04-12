const http = require('http');
const { parse } = require('url');
const bodyParser = require('./body-parser');
const People = require('./models/People');

const app = http.createServer((req, res)=> {
    res.setHeader('content-type', 'text/html');
    const url = parse(req.url, true);
    res.send = json => res.end(JSON.stringify(json));

    if(url.pathname === '/people' && req.method === 'POST') {
        res.setHeader('content-type', 'application/json');
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
