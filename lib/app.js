const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url);
  console.log('wee woo', url);
  if(url.pathname === '/birthday') {
    res.end('happy birthday'); 
  } else if(url.pathname === '/welcome') {
    res.end('hello');
  } else {
    res.statusCode = 404;
    res.end('ne trouvez pas!');
  }
  
  res.setHeader('content type', 'application/json');
  res.end(JSON.stringify({ name: 'me' }));
});

module.exports = app;
