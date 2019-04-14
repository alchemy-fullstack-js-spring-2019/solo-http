const http = require('http');

const { parse } = require('url');
const bodyParser = require('./body-parser');

const peopleRoutes = require('./routes/people');


const app = http.createServer((req, res) => {
  const url = parse(req.url, true);
  res.setHeader('Content-Type', 'application/json');

  //res.send = json => res.end(JSON.stringify(json));

  res.send = (json) => {
    return res.end(JSON.stringify(json));
  };

  req.id = url.query.id;
  

  bodyParser(req)
    .then(body => {
      req.body = body;
      peopleRoutes(req, res);
    });


});

module.exports = app;
