const http = require('http');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const People = require('./models/People');

const app = http.createServer((req, res) => {
  res.send = json => {
    res.end(JSON.stringify(json));
  };
  const url = parse(req.url, true);
  res.setHeader('Content-Type', 'application/json');

  const withIdPatter = /\/people\/(?<id>[\w-]*)/;

  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(json => {
        return People.create((
          { 
            name: json.name, 
            age: json.age,
            footwear: json.footwear
          }));
      })
      .then(createdPerson => res.send(createdPerson));
  }

  if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));
  }

  if(url.pathname.includes('/people/') && req.method === 'GET') {
    People.findById(url.pathname.match(withIdPatter).groups.id)
      .then(person => res.send(person))
      .catch(err => res.send(err));
  }

  if(url.pathname.includes('/people/') && req.method === 'PUT') {
    bodyParser(req)
      .then(json => {
        People.findByIdAndUpdate(url.pathname.match(withIdPatter).groups.id, json)
          .then((updatedPerson) => res.send(updatedPerson));
      });
  }

  if(url.pathname.includes('/people/') && req.method === 'DELETE') {
    const id = url.pathname.split('/')[2];
    People.findByIdAndDelete(id)
      .then(data => res.send(data));
  }
});

module.exports = app;
