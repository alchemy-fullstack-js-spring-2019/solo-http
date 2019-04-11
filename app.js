const http = require('http');
const { parse } = require('url');


module.exports = http.createServer((req, res) => {
  const url = parse(req.url); 
  switch(url.pathname) {
    case '/tester':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 'firstName': 'mister', 'lastName': 'Testy' }));
      break;

    default:
      res.statusCode = 404;
      res.end(`Sorry buuuuut....:${res.statusCode}`);
      break;
  }
});
