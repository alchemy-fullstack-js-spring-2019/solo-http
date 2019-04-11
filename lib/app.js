const { parse } = require('url');
const http = require('http');

const app = http.createServer((req, res) => {
  console.log('Connected');
  const url = parse(req.url);
  
  switch(url.pathname) {
    case '/tester':
      res.statusCode = 200;
      res.end('testing123');
      break;
    default:
      res.end('Try again, sucka!');
  }
});

module.exports = app;
