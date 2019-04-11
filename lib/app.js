const http = require('http');
const { parse } = require('url');
const request = require('superagent');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  console.log(url);
  res.setHeader('Content-type', 'application/json');
  if(url.pathname.includes('character')) {
    request.get(`https://rickandmortyapi.com/api/${url.pathname}`)
      .then(res => res.body)
      .then(character => {
        res.end(JSON.stringify({
          name: character.name,
          status: character.status,
          species: character.species
        }));
      });
  }
  switch(url.pathname) {
    case '/tester':
      res.end(JSON.stringify({ testing: 123 }));
      break;
    case '/you':
      res.end(JSON.stringify({ text: `hi there ${url.query.name}` }));
      break;
  }
});
