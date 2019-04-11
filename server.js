const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: 'Mal' }));
}).listen(7890);
