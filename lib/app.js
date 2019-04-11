const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url);
  /*eslint-disable-next-line*/
  console.log(url);

  if(url.pathname === '/birthday') {
    res.end('Happy Birthday!');
  } else if(url.pathname === '/tomorrow') {
    res.end('Tomorrow, tomorrow.');
  } else if(url.pathname === '/birthday/tomorrow') {
    res.end('Tomorrow is your birthday.');
  } else if(url.pathname === '/tester') {
    res.end('testing123');
  } else {
    res.statusCode = 404;
    res.end('404 Not found');
  }
});

module.exports = app;
