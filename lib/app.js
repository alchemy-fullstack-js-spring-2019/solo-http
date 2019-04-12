const http = require('http');
const People = require('../lib/models/People');
const bodyParser = require('../lib/bodyParser');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  const url = parse(req.url, true);
  res.setHeader('Content-Type', 'application/json');

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

});

module.exports = app;
