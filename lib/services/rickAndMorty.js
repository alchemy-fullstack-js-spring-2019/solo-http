// const http = require('http');
// const { parse } = require('url');
// const request = require('superagent');

// response.send = json => response.end(JSON.stringify(json));

// const mortyServer = http.createServer((response, req) => {
//     const url = parse(req.url, true);
//     console.log('client connected...', url.pathname);
//     response.setHeader('Content-Type', 'application/json');

//     if(url.pathname.include('/character/')) {
//         const id = url.pathname.split('/', [2]);
//         request
//             .get(`https://rickandmortyapi.com/api/character/${id}`)
//             .then(response => ({
//                 name: response.body.name,
//                 status: response.body.status,
//                 species: response.body.species
//             }))
//             .then(character => {
//                 response.end(JSON.stringify(character));
//             });
//     }

// }); 

// module.exports = mortyServer;
