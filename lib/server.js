const http = require('http');
// const { parse } = require('url');

http.createServer((req, res) => {
  console.log('Req incoming!');
}).listen(8888);
