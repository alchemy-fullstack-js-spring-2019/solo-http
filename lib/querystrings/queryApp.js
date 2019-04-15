const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {

  const querySearch = parse(req.url, true).query;
 
  if(querySearch.name === 'Krusty') {
    res.setHeader('Content-Type', 'application/json');
    console.error('This is the Krusty Query Page');
    res.end(`Hi there ${querySearch.name}!`);
  } else res.end('You are not Krusty!');
});

module.exports = { app };
