const http = require('http');
const { parse } = require('url');

http.createServer((req, res)=> {
    res.setHeader('content-type', 'text/html');
    const url = parse(req.url);
    console.log(url);

    switch(url.pathname) {
        case '/birthday':
            res.end('happy birthday!');
            break;
        case '/tomorrow':
            res.end('tomorrow, tomorrow...');
            break;
        case '/birthday/tomorrow':
            res.end('tomorrow is your birthday!');
            break;
        default:
            res.statusCode = 404;
            res.end('404 FILE NOT FOUND');
            break;
        
    }
}).listen(7890);
