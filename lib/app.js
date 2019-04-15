const { parse } = require('url');
const http = require('http');
const bodyParser = require('./body-parser.js');
const people = require('./routes/people.js');
const kittens = require('./routes/kittens.js');
   

const resources = {
  people,
  kittens
};

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);

  res.setHeader('content-type', 'application/json');
  res.send = json => res.end(JSON.stringify(json));
  const id = url.pathname.split('/')[2];
  req.id = id;

  const resource = url.pathname.split('/')[1];
  const resourceRoutes = resources[resource];

  bodyParser(req)
    .then(body => {
      req.body = body;
      resourceRoutes(req, res);
    });
});


module.exports = app;
