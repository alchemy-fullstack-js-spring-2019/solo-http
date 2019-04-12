const http = require('http');
// const uuid = require('uuid/v4');
const { parse } = require('url');  //turns url into an object
const bodyParser = require('./body-parser');
const People = require('./models/People');

// const notes = {};

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  res.setHeader('Content-Type', 'application/json');

  const url = parse(req.url, true);/\/people\/(?<id>[\w-]*)/;

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

  } else if(url.pathname.includes('/people/') && req.method === 'GET'){
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(person => res.send(person));

  } else if(url.pathname.includes('/people') && req.method === 'PUT') {
    const id = url.pathname.split('/')[2];
    People.findByIdAndUpdate(id, updatedPerson)
      .then(updatedPerson => res.send(updatedPerson));
  }



});

module.exports = app;
