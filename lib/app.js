const http = require('http');
const { parse } = require('url');


module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  console.log(req.url, url);
 
  if(url.pathname === '/') {
    res.end('generic');
  } else if(/[a-z]/.test(url.pathname)) {
    res.setHeader('Content-Type', 'application/json');
    // getPerson()
    //   .then(humaninfo => res.end(JSON.stringify({ humaninfo })));
  }
});
