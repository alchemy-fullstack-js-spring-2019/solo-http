const { parse } = require('url');
const http = require('http');

const app = http.createServer((req, res) => {
  const url = parse(req.url);
  if(url.pathname === '/tester') {
    res.end('testing123');
  }
});

module.exports = app;
