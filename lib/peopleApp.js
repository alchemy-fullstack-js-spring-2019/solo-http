const http = require('http');
const { parse } = require('url');

const bodyParser = require('./body-parser');
const People = require('../lib/models/People');

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));

  const withIdPattern = /\/people\/(?<id>[\w-]*)/;

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
        console.log(createdPerson);
        res.send(createdPerson);
      });
  } else if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));
  } else if(withIdPattern.test(url.pathname)) {
    const id = url.pathname.match(withIdPattern).groups.id;
    People.findById(id)
      .then(person => res.send(person));
  }
});

module.exports = app;
