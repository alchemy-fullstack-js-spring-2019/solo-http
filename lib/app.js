const { parse } = require('url');
const http = require('http');

const app = http.createServer((req, res) => {
  const url = parse(req.url);
  if(url.pathname === '/tester') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ testing: 123 }));
  }
});

module.exports = app;
