const People = require('./models/People');
const http = require('http');
const bodyParser = require('./body-parser');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  res.setHeader('Content-Type', 'application/json');
  const url = parse(req.url, true);
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(body => {
        return People.create({
          name: body.name,
          age: body.age,
          color: body.color
        });
      })
      .then(createdPerson => res.send(createdPerson));
  }
  else if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));
  }
  else if(url.pathname.includes('/people/')) {
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(foundPerson => res.send(foundPerson));
  }
  else if(url.pathname.includes('/people/' && req.method === 'PUT')) {
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(foundPerson => {
        const foundToUpdate = JSON.stringify(foundPerson);
      })
      .then(foundToUpdate => bodyParser(foundToUpdate))
      .then(json => {
        return People.findByIdAndUpdate(newId, {
          name: json.name,
          age: json.age,
          color: json.color,
          _id: newId
        });
      });
  }
});

module.exports = app;
