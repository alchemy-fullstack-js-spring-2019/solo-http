const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);

  if(url.pathname === '/birthday') {
    res.end('Happy Birthday!');
  } else if(url.pathname === '/tomorrow') {
    res.end('Tomorrow, tomorrow');
  } else if(url.pathname === '/tomorrow/birthday') {
    res.end('Tomorrow is your birthday!');
  } else if(url.pathname === '/') {
    res.statusCode = 404;
    res.end('Not Found');
  }
  res.writeHeader({ 'Content-type': 'application/json' });
  res.end('thanks for visiting!');
  console.log('Req incoming!');
}).listen(2121);
