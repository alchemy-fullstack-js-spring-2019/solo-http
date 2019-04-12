const http = require('http');
const { parse } = require('url');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  const query = url.query; 
  
  console.log(query);
  switch(url.path) {
    case '/tester':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 'firstName': 'mister', 'lastName': 'Testy' }));
      break;

    case `/you?name=${query.name}`:
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 'text': `hi there ${query.name}` }));
      break;

    default:
      res.statusCode = 404;
      res.end(`Sorry buuuuut....:${res.statusCode}`);
      break;
  }
});
