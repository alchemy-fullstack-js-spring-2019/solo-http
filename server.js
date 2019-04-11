const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  if(url.pathname === '/birthday') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write('Happy birthday!');
    res.end();
  } else if (url.pathname === '/tomorrow') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write('Tomorrow, tomorrow!');
    res.end();
  } else if (url.pathname === '/birthday/tomorrow') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write('Tomorrow is your birthday!');
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write('404: Not found.');
    res.end();
  }
}).listen(8080);


// 200 - okay
// 204 - okay, but no content
// 301 - redirect
// 304 - redirect
// 400 - bad request
// 401 - unauthorized
// 403 - forbidden
// 404 - not found
