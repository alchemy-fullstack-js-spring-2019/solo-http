const http = require('http');
const { parse } = require('url');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  res.setHeader('Content-type', 'text/html');
  if(url.pathname === '/tester') res.end('testing123');
});
