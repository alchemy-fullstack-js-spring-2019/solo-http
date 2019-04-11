const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = (parse(req.url));
  const query = (parse(req.url, true).query);
  const name = query.name;

  if(url.pathname === '/tester'){
    res.end('{ testing: 123 }');
  }

  if(url.pathname === '/birthday'){
    res.end('Happy Birthday');
  }

  if(url.pathname === '/you'){
    res.end(`{ text: hi there ${name} }`);
  }

  
});

const rick = http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
});

module.exports = {
  app
};
