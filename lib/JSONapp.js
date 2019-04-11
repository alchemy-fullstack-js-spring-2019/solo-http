const { parse } = require('url');
const http = require('http');


const app = http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  res.setHeader('Content-type', 'application/json');
  if(url.pathname === '/tester') {
    res.end(JSON.stringify({ 'testing': 123 }));
  }
  else {
    req.statusCode = 404;
    res.end('Not found');
  }
});

module.exports = app;
