const http = require('http');
const { parse } = require('url');
const bodyParser = require('./body-parser');
const People = require('./models/People');

const peopleApp = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send = json => res.end(JSON.stringify(json));

  const url = parse(req.url, true);
  const query = parse(req.url).query;

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
      
  }  else if(url.pathname === '/people' && req.method === 'GET') {   
    People.find()
      .then(createdPerson => res.send(createdPerson));

  } else if(url.pathname === '/people' && query && req.method === 'GET') {
    People.find(query.id)
      .then(people => res.send(people));

  } else if(url.pathname === '/people' && req.method === 'PUT') {
    bodyParser(req)
      .then(json => {
        People.findByIdAndUpdate(query.id, json);
      });
  }
  

  
});

module.exports = {
  peopleApp
};
