const http = require('http');
const People = require('../lib/models/People');
const bodyParser = require('../lib/bodyParser');
const { parse } = require('url');

const app = http.createServer((req, res) => {
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
      .then(createdPerson => {
        res.send(createdPerson);
      });
  } else if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(allPeople => {
        res.send(allPeople);
      });
  } else if(url.pathname.includes('/people') && req.method === 'GET') {
    // console.log(url.pathname.slice(8));
    const id = url.pathname.slice(8);
    People.findById(id)
      .then(foundPerson => {
        res.send(foundPerson);
      });
  } else {
    res.statusCode = 404;
    res.send({ page: '404: Not found' });
  }

});

module.exports = app;
