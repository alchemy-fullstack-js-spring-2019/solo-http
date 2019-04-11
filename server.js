const http = require('http');

http.createServer((req, res) => {
  console.log('Request incoming!');
  res.setHeader('Content-Type', 'text/html');
  res.end(`
  <html>
    <head>
      <title>Hi</title>
    </head>
    <body>
      <h1>Thanks for visiting!</h1>
    <body>
  </html>
  `);
}).listen(7890);
