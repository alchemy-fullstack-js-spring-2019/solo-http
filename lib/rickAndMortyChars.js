const { parse } = require('url');
const http = require('http');
const superagent = require('superagent');

http.createServer((req, res) => {
  const url = parse(req.url, true);
  if(url.pathname.includes('/character')) {
    const pattern = /[0-9]+/;
    const id = url.pathname.match(pattern);
    const rickAndMortyUrl = `https://rickandmortyapi.com/api/character/${id}`;
    superagent
      .get(rickAndMortyUrl)
      .then(data => {
        const obj = {
          name: data.body.name,
          status: data.body.status,
          species: data.body.species
        };
        const objSting = JSON.stringify(obj);
        res.setHeader('Content-Type', 'application/json');
        res.end(objSting);
      });
  }
}).listen(8080);
