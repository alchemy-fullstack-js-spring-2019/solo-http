const http = require('http');
const uuid = require('uuid/v4');
const { parse } = require('url');
const bodyParser = require('./body-parser');
const People = require('./models/People');

const notes = {};
const appRouting = http.createServer((req, res) => {
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
      .then(createdPerson => res.send(createdPerson));
  } else if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));
  } else if(url.pathname.includes('/people/')) {
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(person => res.send(person));
  }
});

module.exports = appRouting;
