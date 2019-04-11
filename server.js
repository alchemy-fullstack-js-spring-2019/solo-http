const http = require('http');
const { parse } = require('url');

// 200 - ok
// 204 - ok but no content
// 301 - redirect
// 304 - redirect
// 400 - bad request
// 401 - unauthorized
// 403 - forbidden
// 404 - not found
// 500 - internal server error
// 503 - timeout


http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);

  if(url.pathname === '/birthday') {
    res.end('Happy Birthday!');
  } else if(url.pathname === '/tomorrow') {
    res.end('Tomorrow, tomorrow.');
  } else if(url.pathname === '/birthday/tomorrow') {
    res.end('Tomorrow is your birthday.');
  } else {
    res.end('404 Not found');
  }
}).listen(7890);
