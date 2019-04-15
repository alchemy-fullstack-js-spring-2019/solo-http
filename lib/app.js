const http = require('http');
const uuid = require('uuid/v4');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const People = require('./models/People');

// const notes = {};
const app = http.createServer((req, res) => {
  const url = parse(req.url, true);

  res.setHeader('Content-Type', 'application/json');
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(body => {
        People
          .create({ name: body.name })
          .then(createdPerson => {
            res.end(JSON.stringify(createdPerson));
          });
      });
  } else if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.end(JSON.stringify(people)));
  } else if(url.pathname.includes('/people/') && req.method === 'GET') {
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(person => res.end(JSON.stringify(person)));
  } else if(url.pathname.includes('/people/') && req.method === 'PUT') {
    const id = url.pathname.split('/')[2];
    bodyParser(req)
      .then(body => {
        return People.findByIdAndUpdate(id, { name: body.name });
      })
      .then(person => res.end(JSON.stringify(person)));
  } else if(url.pathname.includes('/people/') && req.method === 'DELETE') {
    const id = url.pathname.split('/')[2];
    People.findByIdAndDelete(id)
      .then(result => res.end(JSON.stringify(result))); 
  }
});

module.exports = app;
