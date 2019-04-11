const http = require('http');
const { parse } = require('url');

// tcp uses SOCKETS
// request, response

const app = http.createServer((req, res) => {
  const url = parse(req.url);
  console.log('We Linked!', url);
  
  res.setHeader('Content-Type', 'text/html');
  switch(url.pathname) {
    case '/':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ name: 'Parker' }));
      break;
    case '/birthday':
      res.end('Happy Birthday');
      break;
    case '/tomorrow':
      res.end('Tomorrow, Tomorrow');
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found');
      break;
  }
});

module.exports = app;
