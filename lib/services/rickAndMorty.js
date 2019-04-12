const http = require('http');
const { parse } = require('url');
const request = require('superagent');


const mortyServer = http.createServer((response, req) => {
    console.log('YO');
    response.send = json => response.end(JSON.stringify(json));
    const url = parse(req.url, true);
    console.log(url);
    console.log('client connected...', url.pathname);
    response.setHeader('Content-Type', 'application/json');
    if(url.pathname.include('/character/')) {
        const id = url.pathname.split('/', [2]);
        console.log(id);
        return request
            .get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => ({
                name: response.body.name,
                status: response.body.status,
                species: response.body.species
            }))
            .then(character => {
                response.send(character);
            });
    }

}); 

module.exports = mortyServer;
