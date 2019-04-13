const http = require('http');

const { parse } = require('url');
const bodyParser = require('./body-parser');

const peopleRoutes = require('./routes/people');


const app = http.createServer((req, res)=>{
  res.setHeader('Content-Type', 'application-jason');
  res.send = json => res.end(JSON.stringify(json));
  
  const url = parse(req.url, true);
  req.id = url.query.id;


  bodyParser(req)
    .then(body =>{
      req.body = body;
      peopleRoutes(req, res);
    });


});

module.exports = app;
