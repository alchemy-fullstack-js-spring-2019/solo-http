const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);
  if(url.pathname === '/birthday') {
    res.end('Happy Birthday!');
  } else if(url.pathname === '/tomorrow') {
    res.end('Tomorrow, tomorrow, there\'s always tomorrow...');
  } else if(url.pathname === '/birthday/tomorrow') {
    res.end('Tomorrow is your birfday!');
  } else if(url.pathname === '/tester') {
    res.end('testing123');
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

module.exports = app;
