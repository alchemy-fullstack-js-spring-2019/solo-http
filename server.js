const http = require('http');
const { parse } = require('url');
const app = require('./lib/app.js');
// http.createServer((request, response) => {
//     const url = parse(request.url);
//     console.log('client connected...' + url);
//     response.setHeader('Content-Type', 'text/plain');
//     response.end('Hello All');
// }).listen(3000);

// http.createServer((request, response) => {
//     const url = parse(request.url);
//     console.log('client connected...' + url);
//     response.setHeader('Content-Type', 'text-html');
//     response.end(`
//     <html>
//         <head>
//             <title>WORLD WIDE WEB</title>
//         </head>
//             <body>
//                 <h1>Thanks for visiting!</h1>
//             </body>
//     </html>
//     `);
// }).listen(3000);

function throw404Statement(response) {
    response.writeHead(404, 'Content-Type', 'text/plain');
    response.write('404 sweet meats ;)');
    response.end();
}


http.createServer((request, response) => {
    const url = parse(request.url);
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
}).listen(3000);
