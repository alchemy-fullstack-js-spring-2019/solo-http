const { parse } = require('url');
const http = require('http');


const queryApp = http.createServer((req, res) => {
  const query = parse(req.url, true).query;

  if(query.name) {
    res.end(`hello there ${query.name}`);
  }
  else {
    res.end('hey');
  }
 
});

module.exports = queryApp;


