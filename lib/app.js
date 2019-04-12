const http = require('http');
const { parse } = require('url');
const request = require('superagent');

// function throw404Statement(response) {
//     response.writeHead(404, 'Content-Type', 'text/plain');
//     response.write('404 sweet meats ;)');
//     response.end();
// }

// const app = http.createServer((request, response) => {
//     const url = parse(request.url, true);
//     console.log('client connected...', url.pathname);
//     response.setHeader('Content-Type', 'text/plain');
//     switch(url.pathname) {
//         case '/':
//             response.end('hello');
//             break;
//         case '/birthday':
//             response.end('Birthday Birthday');
//             break;
//         case '/tomorrow':
//             response.end('Tomorrow Tomorrow');
//             break;
//         case '/birthday/tomorrow':
//             response.end('Tomorrow is your birthday');
//             break;
//         case '/you':
//             console.log(url.query.name);
//             response.setHeader('Content-Type', 'application/json');
//             response.end(JSON.stringify({ text: `hi there ${url.query.name}` }));
//             break;
//         case '/tester':
//             response.setHeader('Content-Type', 'application/json');
//             response.end(JSON.stringify({ testing: 123 }));
//             break;
//         default:
//             throw404Statement(response);
//     }
// });

const app = http.createServer((req, res) => {
    const url = parse(req.url, true);
    console.log('client connected', url);
    
    if(url.pathname.includes('/character/')) {
        const id = url.pathname.split('/', [2]);
        console.log('ID TEST', id);
        request
            .get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(res => ({
                name: res.body.name,
                status: res.body.status,
                species: res.body.species
            }))
            .then(character => {
                console.log('CHARACTER TEST', character);
                res.end(JSON.stringify(character));
            });
    }
}); 

module.exports = app;
