const http = require('http');
const { parse } = require('url');
const request = require('superagent');

const app = http.createServer((req, res) => {
  
  const querySearch = parse(req.url, true).query;
  
  // if(querySearch.pathname === '/character/:ID') {
  //   res.setHeader('Content-Type', 'application/json');
  //   console.error('This is the Krusty Query Page');
  //   res.end(`Hi there ${querySearch.name}!`);
  // } else res.end('You are not Krusty!');

  request
    .get('https://rickandmortyapi.com/api/character/:ID')
    .then(res => {
      
    });

});

module.exports = { app };

// use http.createServer to create a new http server
// respond to the following paths
// /character/:ID
// grab the id from the path
// make a request to the rick and morty api using superagent (get a character by ID)
// respond with the name, status, and species of the character as json
// HINT: set the content type

// request 
//   .get('https://rickandmortyapi.com/api/character/')
//   //Promise.resolve(),
//   .then(res => res.body.results)
//   .then(characters => characters.map(character => character.origin.url))
//   //origin.url is from the api's docs
//   .then(characterLocationUrls => characterLocationUrls.filter(url => url !== ''))
//   .then(characterLocationUrls => {
//     return Promise.all(characterLocationUrls.map(url => {
//       return request.get(url).then(res => {
//         res.body;
//         console.log(res.body);
//       });
//     }));
//   });
