const http = require('http');
const { parse } = require('url');
//const url = require('url');

const app = http.createServer((req, res) => {
  //const url = parse(req.url);

  const querySearch = parse(req.url, true).query;

  if(querySearch.includes('Krusty')) {
    console.error('This is the Krusty Query Page');
    res.end({ text: `hi there ${querySearch.name}` });
  }
});

module.exports = { app };
