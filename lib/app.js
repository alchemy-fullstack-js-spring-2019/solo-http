const http = require('http');
const { parse } = require('url');  //turns url into an object
const bodyParser = require('./body-parser');
const people = require('./routes/people');
const toys = require('./routes/toys');

const resources = {
  people,
  toys
};

const app = http.createServer((req, res) => {

  const url = parse(req.url, true);
  const id = url.pathname.split('/')[2];
  
  const resource = url.pathname.split('/')[1];
  const resourceRoutes = resources[resource];
  
  req.id = id;

  res.setHeader('Content-Type', 'application/json');
  res.send = json => res.end(JSON.stringify(json));

  bodyParser(req)
    .then(body => {
      req.body = body;
      resourceRoutes(req, res);
    });
});

module.exports = app;
