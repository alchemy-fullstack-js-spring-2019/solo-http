const http = require('http');
const { parse } = require('url');
const request = require('superagent');
const uuid = require('uuid/v4');
const bodyParser = require('./body-parser');
const People = require('./model/People');

const notes = {};

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  
  const url = parse(req.url, true);
   
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(json => {
        return People.create({
          name: json.name,
          age: json.name,
          color: json.color
        });
      })
      .then(createdPerson => res.send(createdPerson));
    
  }
     
});

module.exports = app;

