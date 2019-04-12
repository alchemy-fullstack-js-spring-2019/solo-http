const http = require('http');
const { parse } = require('url');
const app = require('./lib/app');


http.createServer((req, res) => {
  const url = parse(req.url);

  switch(url.pathname) {
    case '/birthday':
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><span style="color:red">Happy Birthday Fren</span></body></html>');
      break;
    
    case '/json':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 'firstName': 'Duckface', 'lastName': 'McLiverneck' }));
      break;

    case '/waterfalls':
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><span style="color:blue">| | |<br/>| | |<br/>| | |<br/>| | |<br/>| | |<br/>| | |<br/>| | |<br/>| | |<br/>| | |<br/>| | |<br/>| | |<br/>| | |<br/>****</span></body></html>');
      break;

    default:
      res.statusCode = 404;
      res.end(`Sorry buuuuut....:${res.statusCode}`);
      break;
  }
})
  .listen(7890);



app.listen(7890, () => console.log('server is running'));
