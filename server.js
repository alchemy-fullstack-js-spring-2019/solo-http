const http = require('http');
const { parse } = require('url');  //turns url into an object

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const url = parse(req.url);
  console.log(url);
  
  if(url.pathname === '/birthday') {
    res.end('Happy Birthday');
  } else if(url.pathname === '/tomorrow') {
    res.end('Tomorrow, Tomorrow');
  } else if(url.pathname === '/birthday/tomorrow') {
    res.end('Tomorrow is your birthday'); 
  } else {
    res.statusCode = 404;
    res.end('That is not an option');
  }
}).listen(9900);
