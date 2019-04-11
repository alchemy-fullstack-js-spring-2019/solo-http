const http = require('http');

http.createServer((req, res) => {
  console.log('Connected!');
  res.end('Hi!');
}).listen(7890);
