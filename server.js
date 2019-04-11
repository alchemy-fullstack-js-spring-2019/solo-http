const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = (parse(req.url));
  console.log(url);
  
  if(url.pathname === '/birthday'){
    res.setHeader('Content-Type', 'text/html');
    res.end(`
  <html>
    <head>
      <title>Bday</title>
    </head
    <body>
      <h1> Happy Bday</h1>
    </body>
  </html>`);
  }

  if(url.pathname === '/tomorrow'){
    res.setHeader('Content-Type', 'text/html');
    res.end(`
  <html>
    <head>
      <title>Tomorrow</title>
    </head
    <body>
      <h1> Tomorrow</h1>
    </body>
  </html>`);
  }
  if(url.pathname === '/birthday/tomorrow'){
    res.setHeader('Content-Type', 'text/html');
    res.end(`
  <html>
    <head>
      <title>Tomorrow Birthday</title>
    </head
    <body>
      <h1> Tomorrow is your birthday!</h1>
    </body>
  </html>`);
  }
}).listen(7890);
