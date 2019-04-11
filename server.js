const http = require('http');
const { parse } = require('url');

http.createServer((req, res)=> {
    res.setHeader('content-type', 'text/html');
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
        res.statusCode = 404;
        res.end('404 FILE NOT FOUND');
    }
}).listen(7890);
