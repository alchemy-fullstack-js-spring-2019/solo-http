const { parse } = require('url');
const http = require('http');
const request = require('superagent');
const getCharacter = require('./services/rickAndMortyCharacter');

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);

  if(url.pathname.includes('/character/')) {
    const id = url.pathname.split('/')[2];
    getCharacter(id)
      .then(character => res.end(JSON.stringify(character)));
  }
  
});

module.exports = app;

