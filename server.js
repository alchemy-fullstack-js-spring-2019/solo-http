const http = require('http');
const { parse } = require('url');

http.createServer((req, res)=> {
    const url = parse(req.url);
    console.log(url);
    if(url.pathname === '/birthday') {
        res.end('happy birthday!');
    }
    else if(url.pathname === '/tomorrow') {
        res.end('tomorrow, tomorrow');
    }
    else if(url.pathname === '/birthday/tomorrow') {
        res.end('tomorrow is your birthday!');
    }
    else {
        res.send(404);
    }
    res.setHeader('content-type', 'text/html');
    res.end(`<html>
    <head>
    <title>cool site</title>
    </head>
    <body> 
    <h1>thanks for saying hi</h1>
    </body>
    </html>`);
    
}).listen(7890);
