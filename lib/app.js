const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url);
  if(url.pathname === '/tester') {
    res.end('T e s t i n g 1 2 3');
  }
});

module.exports = app;
