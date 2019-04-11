const http = require('http');
const { parse } = require('url');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  console.log(url);
  switch(url.pathname) {
    case '/tester':
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify({ testing: 123 }));
      break;
    case '/you':
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify({ text: `hi there ${url.query.name}` }));
      break;
  }
});
