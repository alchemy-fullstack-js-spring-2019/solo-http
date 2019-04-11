const http = require('http');
const { parse } = require('url');

function throw404Statement(response) {
    response.writeHead(404, 'Content-Type', 'text/plain');
    response.write('404 sweet meats ;)');
    response.end();
}

const app = http.createServer((request, response) => {
    const url = parse(request.url, true);
    console.log('client connected...', url.pathname);
    response.setHeader('Content-Type', 'text/plain');
    switch(url.pathname) {
        case '/':
            response.end('hello');
            break;
        case '/birthday':
            response.end('Birthday Birthday');
            break;
        case '/tomorrow':
            response.end('Tomorrow Tomorrow');
            break;
        case '/birthday/tomorrow':
            response.end('Tomorrow is your birthday');
            break;
        default:
            throw404Statement(response);
    }
});

module.exports = app;
