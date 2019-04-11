const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  console.log('Connected');

if(url.pathname === '') {
  // respond one wy
} else if(url.pathname = '') {
  // other wy
} else {
  // redirect 404
}

  res.setHeader('Content-Type', 'text-html');
  res.end(`
  <html>
    <head>
      <title>HTML AGAIN THANK GOD</title>
    </head>
    <body>
      <h1>I miss you, HTML</h1>
      <h6>Bye :(</h6>
    </body>
  </html>
  `);
}).listen(6969);
