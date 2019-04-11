const http = require('http');
const { parse } = require('url');
const app = require('./app');

//create server
http.createServer((req, res) => {
    console.log('Connected on 7890');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ name: 'Bonnie' }));
}).listen(7890);

//respond from server
http.createServer((req, res) => {
    console.log('Connected on 12345');
    const url = parse(req.url);
    console.log(url);
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
          <head><title>Hi</title></head>
          <body><h1>Hello World</h1></body>
      </html>
    `);
}).listen(12345);

//respond based on path
http.createServer((req, res) => {
    console.log('Connected on 2345');
    const url = parse(req.url);
    let response;
    switch(url.pathname) {
        case '/': 
            response = `
                <html>
                    <head><title>Hi</title></head>
                    <body><h1>Hello World</h1></body>
                </html>
            `;
            break;
        case '/birthday': 
            response = `
                <html>
                    <head><title>Birthday</title></head>
                    <body><h1>Happy birthday!</h1></body>
                </html>
            `;
            break;
        case '/tomorrow': 
            response = `
                <html>
                    <head><title>Tomorrow</title></head>
                    <body><h1>Tomorrow, Tomorrow</h1></body>
                </html>
                `;
            break;
        default:
        //set status
            response = `
            <html>
                <head><title>Nope</title></head>
                <body><h1>404 not found</h1></body>
            </html>
            `;
            response.statusCode = 404;
    }
    console.log(url);
    res.setHeader('Content-Type', 'text/html');
    res.end(response);
}).listen(2345);

http.createServer(app)
    .listen(23456);
