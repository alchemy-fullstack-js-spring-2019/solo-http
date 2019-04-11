const http = require('http');
const { parse } = require('url');

const jsonApp = http.createServer((req, res) => {
  const url = parse(req.url);
  // /*eslint-disable-next-line*/
  // console.log(url);
  res.setHeader('Content-Type', 'application/json');

  if(url.pathname === '/tester') {
    res.end(JSON.stringify({ testing: 123 }));
  } else {
    res.statusCode = 404;
    res.end('404 Not found');
  }

});

module.exports = jsonApp;
