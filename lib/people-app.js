const http = require('http');
// const uuid = require('uuid/v4');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const People = require('./models/People');

const peopleApp = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));

  res.setHeader('Content-Type', 'application/json');
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

  if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));
  }

  if(url.pathname.includes('/people/')) {
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(person => res.send(person));
  }
});

module.exports = peopleApp;
