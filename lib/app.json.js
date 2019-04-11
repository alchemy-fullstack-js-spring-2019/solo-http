const http = require('http');
const { parse } = require('url');

const appJson = http.createServer((req, res) => {
  console.log('Connected!');
  const url = parse(req.url);
  
  switch(url.pathname) {
    case '/tester':
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ testing: 123 }));
      break;
    default:
      res.setHeader('Content-Type', 'text/html');
      res.end('Try again, sucka!');

  }
});

module.exports = appJson;
