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
      res.end('404 Error')
      break;
  }
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({ name: 'chris' }));

}).listen(7890);
