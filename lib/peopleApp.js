const People = require('./models/People');
const http = require('http');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const people = require('./routes/people');

const resources = {
  people
};

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);

  res.setHeader('Content-Type', 'application/json');

  res.send = json => res.end(JSON.stringify(json));

  const id = url.pathname.split('/')[2];
  req.id = id;

  const resource = url.pathname.split('/')[1];
  const resourceRoutes = resources[resource];
   
});

module.exports = app;
