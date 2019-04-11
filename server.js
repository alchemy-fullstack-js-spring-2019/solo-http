const http = require('http');
const { parse } = require('url');

// tcp uses SOCKETS
// request, response

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log('We Linked!', url);
  
  res.setHeader('Content-Type', 'application/json', 'text/html');
  switch(url.pathname) {
    case '/birthday':
      res.end('Happy Birthday');
      break;
    case '/tomorrow':
      res.end('Tomorrow, Tomorrow');
      break;
    case '/home':
      res.end(JSON.stringify({ name: 'Parker' }));
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found');
      break;
  }
  
}).listen(4657, () => { console.log('Parker: server running'); });
