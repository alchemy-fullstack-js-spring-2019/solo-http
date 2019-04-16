const http = require('http');
const { parse } = require('url');

const jsonApp = http.createServer((req, res) => {
  const url = parse(req.url);
  
  if(url.pathname === '/tester') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ testing: 123 }));
  } else {
    res.statusCode = 404;
    res.end('404 Not found');
  }
});

module.exports = jsonApp;
