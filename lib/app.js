const { parse } = require('url');
const http = require('http');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url);

  const path = url.pathname;
  let message = '';

  switch(path) {
    case '/testing' : 
      message = 'testing 123';
      res.end(`${message}`);
      break;
    case '/birthday' : 
      message = 'Happy Birthday';
      res.end(`${message}`);
      break;
    case '/tomorrow' : 
      res.end(`${message}`);
      message = 'Tomorrow, Tomorrow';
      break;
    case '/birthday/tomorrow' : 
      message = 'Tomorrow is your birthday!!!';
      res.end(`${message}`);
      break;
    case '/tester' :   
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ testing: 123 }));
      break;
    case '/you' : 
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ text: `hi there ${url.query.split('=')[1]}` }));
      break;
  }
});
