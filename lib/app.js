const http = require('http');
const { parse } = require('url');  //turns url into an object

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const url = parse(req.url);
  console.log(url);

  switch(url.pathname) {
    case '/birthday':
      res.end('Happy Birthday');
      break;
    case '/tomorrow':
      res.end('Tomorrow, tomorrow, tomorrow');
      break;
    case '/birthday/tomorrow':
      res.end('Tomorrow is your birthday, eh?');
      break;
    case '/tester':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ name: 'stitch' }));
      break;
    default:
      res.statusCode = 404;
      res.end('absolutely not an option, not found');
  }
});

module.exports = app;

