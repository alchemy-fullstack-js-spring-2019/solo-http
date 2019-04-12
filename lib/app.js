const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);
  if(url.pathname === '/you') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ text: `Hello, ${url.query.name}.` }));
  }
});

module.exports = app;
