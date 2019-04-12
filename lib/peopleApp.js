const People = require('./models/People');
const http = require('http');
const bodyParser = require('./body-parser');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  res.setHeader('content-type', 'application/json');
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
  else if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));
  }
});

module.exports = app;
