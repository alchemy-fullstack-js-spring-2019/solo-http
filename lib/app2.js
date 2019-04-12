const http = require('http');
const { parse } = require('url');
const request = require('superagent');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  if(url.pathname.includes('/character/')) {
    const id = url.pathname.split('/')[2];
    console.log(id);
    return request
      .get(`https://rickandmortyapi.com/api/character/${id}`)
    //   .then(character => console.log('characters', character.body))
      .then(character => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          name: character.body.name,
          status: character.body.status,
          species: character.body.species 
        }));
      });
  }

});
