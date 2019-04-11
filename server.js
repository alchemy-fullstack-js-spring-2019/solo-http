const http = require('http');
// const { parse } = require('url');

http.createServer((req, res) => {
  res.end('thanks for visiting!');
  console.log('Req incoming!');
}).listen(2121);
