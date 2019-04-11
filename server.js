const http = require('http');
const { parse } = require('url');

//no sockets, now request and response
http.createServer((req, res) => {
  const url = parse(req.url);
  switch(url.pathname) {
    case '/birthday':
      res.setHeader('Content-Type', 'HTML');
      res.end(
        `<html>
        <body>
        <h1>Hooray!</h1>    
        <p>Happy Birthday</p>
        </body>
        </html>`
      );
      break;
    case '/tomorrow':
      res.setHeader('Content-Type', 'HTML');
      res.end(
        `<html>
        <body>
        <h1>Wait!</h1>    
        <p>Tomorrow, Tomorrow...</p>
        </body>
        </html>`
      );
      break;
    case '/birthday/tomorrow':
      res.setHeader('Content-Type', 'HTML');
      res.end(
        `<html>
        <body>
        <h1>Hooray!</h1>    
        <p>Tomorrow is your ....<br>
        Happy Birthday!</p>
        </body>
        </html>`
      );
      break;
    default: 
      res.end('404 Not Found!');
  }
}).listen(7890);
