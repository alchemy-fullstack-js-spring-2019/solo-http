const http = require('http');
const { parse } = require('url');
const { getCharacter } = require('./service/rickAndMortyApi');

const app = http.createServer((req, res)=> {
    res.setHeader('content-type', 'text/html');
    const url = parse(req.url, true);

    if(url.pathname.includes('/character')) {
        const id = url.pathname.split('/')[2];
        return getCharacter(id)
            .then(character => res.end(character.name));
    }

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
        case '/tester':
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({ testing: 123 }));
            break;
        case '/you':
            res.end((`hi there ${url.query.name}`));
            break;
        default:
            res.statusCode = 404;
            res.end('404 FILE NOT FOUND');
            break;
        
    }
});

module.exports = app;
