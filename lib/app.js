const http = require('http');
const { parse } = require('url');
const request = require('superagent');

const app = http.createServer((req, res)=> {
    res.setHeader('content-type', 'text/html');
    const url = parse(req.url, true);
    console.log(url);

    if(url.pathname.includes('/character')) {
        res.setHeader('content-type', 'application/json');
        const id = url.pathname.split('/')[2];
        console.log(id);
        return request
            .get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(res => ({
                name: res.body.name,
                status: res.body.status,
                species: res.body.species
            }))
            .then(character => res.end(JSON.stringify(character.name)));
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
