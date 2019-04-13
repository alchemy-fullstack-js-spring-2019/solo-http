const People = require('./models/People');
const http = require('http');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const people = require('./routes/people');

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
  else if(url.pathname.includes('/people/') && req.method === 'GET') {
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(foundPerson => res.send(foundPerson));
  }
  else if(url.pathname.includes('/people/' && req.method === 'PUT')) {
    const id = url.pathname.split('/')[2];
    bodyParser(req)
      .then(body => {
        return People.findByIdAndUpdate(id, { name: body.name });
      })
      .then(person => res.send(person));
  }
  else if(url.pathname.includes('/people/') && req.method === 'DELETE') {
    const id = url.pathname.split('/')[2];
    People.findByIdAndDelete(id)
      .then(person => res.send(person));
  }
});

module.exports = app;
