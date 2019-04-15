const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  
  if(url.pathname === '/') {
    res.setHeader('Content-type', 'text/html');
    console.error('This is the Servo Home Page');
    res.end('This is the Servo Home Page');
  } else if(url.pathname === '/birthday') {
    res.setHeader('Content-type', 'application/json');
    console.error('Happy Birthday, servo!');
    res.end(JSON.stringify({ name: 'Happy Birthday, Tom Servo!' }));
  } else if(url.pathname === '/tomorrow') {
    console.error('Tomorrow, tomorrow, servo...');
    res.end(JSON.stringify({ name: 'Tomorrow, tomorrow, Tom Servo...' }));
  } else if(url.pathname === '/tomorrow/birthday') {
    console.error('Tomorrow is Tom Servos birthday! Its my birthday too, yeah!');
    res.end(JSON.stringify({ name: 'Tomorrow Tom Servos birthday! Its my birthday too, yeah!' }));
  } else if(url.pathname === '/tester') {
    console.error('Testing 123');
    res.end(JSON.stringify({ testing: '123' }));
  } else if(url.pathname !== '/') {
    console.error('Sending 404 not found error. Tom Servo');
    res.statusCode = 404;
    res.end(JSON.stringify({ name: '404: Resource Not Found' }));
  }
});

module.exports = app;

