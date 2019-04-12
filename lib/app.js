const http = require('http');
const People = require('./models/People');
const bodyParser = require('./bodyParser');
const peopleRoutes = require('./routes/people');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  const url = parse(req.url, true);
  res.setHeader('Content-Type', 'application/json');

  bodyParser(req)
    .then(body => {
      req.body = body;
      peopleRoutes(req, res);
    });

  
});

module.exports = app;
