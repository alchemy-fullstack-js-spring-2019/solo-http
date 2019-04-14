const http = require('http');
const bodyParser = require('./bodyParser');
const people = require('./routes/people');
const tasks = require('./routes/tasks');
const notFound = require('./routes/notFound');
const { parse } = require('url');

const resources = {
  people,
  tasks
};

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  const url = parse(req.url, true);
  res.setHeader('Content-Type', 'application/json');

  req.id = url.pathname.split('/')[2];

  const resource = url.pathname.split('/')[1];
  const resourceRoutes = resources[resource];

  bodyParser(req)
    .then(body => {
      req.body = body;
      resourceRoutes(req, res);
    })
    .catch(() => {
      notFound(req, res);
    }); 
});

module.exports = app;
