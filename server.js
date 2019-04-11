const http = require('http');

http.createServer((req, res) => {
  console.log('Request incoming!');
  res.end(`
  <html>
    <head>
      <title>Hi</title>
    </head>
    <body>
      <h1>Thanks for visiting!</h1>
    <body>
    `);
}).listen(7890);
