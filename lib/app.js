const { parse } = require('url');
const http = require('http');

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);
  if(url.pathname === '/you') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ text: `hi there ${url.query.name}` }));
  }
});

module.exports = app;
