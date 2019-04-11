const http = require('http');
const { parse } = require('url');


http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);


  res.setHeader('content type', 'application/json');
  res.end(JSON.stringify({ name: 'me' }));
}).listen(7890);
