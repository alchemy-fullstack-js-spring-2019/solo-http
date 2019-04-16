const http = require('http');
const { parse } = require('url');

const jsonapp = http.createServer((req, res) => {
  const url = parse(req.url, true);

  if(url.pathname === '/tester') {
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({ testing: 123 }));
  } else {
    req.statusCode = 404;
    res.end('Not Found');
  }
});

module.exports = jsonapp;
