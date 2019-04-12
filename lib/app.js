const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);
  console.log(url);

  if(url.pathname === '/birthday') {
    res.end('Happy Birthday Mal');
  } else if(url.pathname === '') {
    //things go here
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

module.exports = app;
