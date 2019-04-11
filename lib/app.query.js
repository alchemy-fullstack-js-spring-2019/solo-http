const http = require('http');
const { parse } = require('url');

const appQuery = http.createServer((req, res) => {
  console.log('Connected!');
  const url = parse(req.url, true);
  switch(url.pathname) {
    case '/you':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ text: `hi there ${url.query.name}` }));
      break;
    default:
      res.end('Did not Make it');
      break;
  }

});


module.exports = appQuery;
