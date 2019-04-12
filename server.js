const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  // SERVER FOR POST/PARSE INCLUDED
  
  const url = parse(req.url);
  console.log(url);
  //console.log('Connected!');
  //res.setHeader('Content-type', 'text/html'); //or 'application/json' or 
  
  if(url.pathname === '/') {
    console.table('I am the home page');
    res.end(JSON.stringify({ name: 'I am the Home Page' }));
  }
  if(url.pathname === '/birthday') {
    console.error('Happy Birthday!');
    res.end(JSON.stringify({ name: 'Happy Birthday!' }));
  } else {
    if(url.pathname === '/tomorrow') {
      console.error('Tomorrow, tomorrow');
      res.end(JSON.stringify({ name: 'Tomorrow, tomorrow...' }));
    } else {
      if(url.pathname === '/tomorrow/birthday') {
        console.error('Tomorrow is your birthday! Its my birthday too, yeah!');
        res.end(JSON.stringify({ name: 'Tomorrow is your birthday! Its my birthday too, yeah!' }));
      } else {
        if(url.pathname !== '/') {
          console.error('Sending 404 not found error');
          res.end(JSON.stringify({ name: '404: Resource Not Found' }));
        }
      }
    }
  }
  
  res.setHeader('Content-type', 'application/json');
}).listen(7890);


