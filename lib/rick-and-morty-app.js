const http = require('http');
const request = require('superagent');
const { parse } = require('url');

const rickAndMortyApp = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  const url = parse(req.url, true);
  
  res.setHeader('Content-Type', 'application/json');
  if(url.path.includes('/character/')) {
    const id = url.pathname.split('/')[2];
    request
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => ({
        name: res.body.name,
        species: res.body.species,
        status: res.body.status
      }))
      .then(character => res.send(character));
  }
});

module.exports = rickAndMortyApp;
