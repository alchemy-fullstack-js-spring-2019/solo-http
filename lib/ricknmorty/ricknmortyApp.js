const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  
  const url = parse(req.url, true);

  console.log(url);

  switch(url.pathname) {
    case '/you':
      console.log(url.query);
      res.end('lookie there', url.query.name);
  }
});

module.exports = { app };
