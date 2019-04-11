const http = require('http');
const { parse } = require('url');
const request = require('superagent');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url);

  res.send = char => res.end(JSON.stringify(char));

  if(url.pathname.includes('/character/')) {
    return request
      .get(`https://rickandmortyapi.com/api/character/${url.pathname.split('/')[2]}`)
      .then(response => ({
        Name: response.body.name,
        Status: response.body.status,
        Species: response.body.species
      }))
      .then(char => res.send(char));
  }
});
