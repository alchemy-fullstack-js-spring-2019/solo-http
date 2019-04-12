const http = require('http');
const { parse } = require('url');

const jsonapp = http.createServer((req, res) => {
  const url = parse(req.url);
  if(url.pathname === '/tester') {
    res.end('{ testing: 123 }');
  }
  console.log(url);
});

module.exports = jsonapp;
