const http = require('http');
const { parse } = require('url');
const bodyParser = require('./body-parser');
const People = require('./models/People');
const people = require('./routes/people');

const peopleApp = http.createServer((req, res) => {
  const url = parse(req.url, true); 

  res.setHeader('Content-Type', 'application/json');

  res.send = json => res.end(JSON.stringify(json));
  // POST
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(json => {
        return People.create({
          name: json.name,
        });
      })
      .then(createdPerson => res.send(createdPerson));
  }
  //   // Sends list of ALL people
  // } else if(url.pathname === '/people' && req.method === 'GET') {
  //   People.find()
  //     .then(people => res.send(people));

  // // GETs person by ID
  // } else if(url.pathname.includes('/people/') && req.method === 'GET') {
  //   const id = url.pathname.split('/')[2];
  //   People.findById(id)
  //     .then(person => res.send(person));
  // // GETs person by ID and updates their information
  // } else if(url.pathname.includes('/people/') && req.method === 'PUT') {
  //   const id = url.pathname.split('/')[2];
  //   bodyParser(req) 
  //     .then(body => {
  //       return People.findByIdAndUpdate(id, { name: body.name });
  //     });
  // } else if(url.pathname.includes('/people/') && req.method === 'DELETE') {
  //   const id = url.pathname.split('/')[2];
  //   People.findByIdAndDelete(id)
  //     .then(result => res.end(JSON.stringify(result)));
  // }
});

module.exports = peopleApp;
