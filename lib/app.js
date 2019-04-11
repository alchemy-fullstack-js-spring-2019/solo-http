const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  if(url.pathname === '/birthday') {
    res.end('Happy birthday!');
  } else if (url.pathname === '/tomorrow') {
    res.end('Tomorrow, tomorrow!');
  } else if (url.pathname === '/birthday/tomorrow') {
    res.end('Tomorrow is your birthday!');
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write('404: Not found.');
    res.end();
  }
});

module.exports = app;
