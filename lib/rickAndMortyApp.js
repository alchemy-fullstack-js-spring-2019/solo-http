const { parse } = require('url');
const http = require('http');
const getCharacter = require('./services/rickAndMortyCharacter');

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  const url = parse(req.url, true);

  if(url.pathname.includes('/character/')) {
    res.setHeader('Content-Type', 'application/json');
    const id = url.pathname.split('/')[2];
    getCharacter(id)
      .then(character => res.send(character));
  }
  
});

module.exports = app;

