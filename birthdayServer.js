const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  res.setHeader('Content-type', 'application/json');
  if(url.pathname === '/birthday') {
    res.end(JSON.stringify('Happy Birthday'));
  }
  else if(url.pathname === '/tomorrow') {
    res.end(JSON.stringify('Tomorrow Tomorrow'));
  }
  else {
    res.end(JSON.stringify('hi there'));
  }
}).listen(7890);
