const http = require('http');
// const uuid = require('uuid/v4');
const { parse } = require('url');  //turns url into an object
const bodyParser = require('./body-parser');
const People = require('./models/People');

// const notes = {};

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);/\/people\/(?<id>[\w-]*)/;
  res.setHeader('Content-Type', 'application/json');

  res.send = json => res.end(JSON.stringify(json));

  //post
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
    // gets list of all people
  } else if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));

    //gets person by ID
  } else if(url.pathname.includes('/people/') && req.method === 'GET'){
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(person => res.send(person));
    //PUT
  } else if(url.pathname.includes('/people/') && req.method === 'PUT') {
    const id = url.pathname.split('/')[2];
    bodyParser(req)
      .then(body => {
        return People.findByIdAndUpdate(id, { name: body.name });
      })
      .then(person => res.end(JSON.stringify(person)));
    //DELETE
  } else if(url.pathname.includes('/people') && req.method === 'DELETE') {
    const id = url.pathname.split('/')[2];
    People.findByIdAndDelete(id)
      .then(result => res.end(JSON.stringify(result)));
  }


});

module.exports = app;
