const http = require('http');
const { parse } = require('url');

const queryApp = http.createServer((req, res) => {
  const query = parse(req.url, true).query;

  if(query.name) {
    res.end(`Hi there ${query.name}!`);
  } else {
    res.end('Hey there!');
  }
});

module.exports = queryApp;
