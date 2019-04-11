const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  console.log('Request made!');
  res.setHeader('Content-Type', 'text/html');
  switch(url.pathname) {
    case '/birthday/tomorrow':
      res.end('Tomorrow is your birthday');
      break;
    case '/birthday':
      res.end('Happy Birthday!!');
      break;
    case '/tomorrow':
      res.end('Tomorrow, tomorrow');
      break;
    default:
      res.end(`
        <html>
          <h1>Hello</h1>
          <h2>There</h2>
        </html>
      `);
  }
}).listen(7890);
