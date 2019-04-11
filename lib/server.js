const http = require('http');

//no sockets, now request and response
http.createServer((req, res) => {
  console.log('connected');
  res.end('hi');
}).listen(7890);
