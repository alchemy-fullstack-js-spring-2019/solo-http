const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);

  
  switch(url.pathname) {
    case '/birthday':
      res.end('Happy Birthday');
      break;
    case '/tomorrow':
      res.end('Tomorrow, Tomorrow');
      break;
    case '/birthday/tomorrow':
      res.end('Tomorrow is your birthday');
      break;
    default:
      res.statusCode = 404;
      res.end('Not found');
      break;
  }
}).listen(7890);
