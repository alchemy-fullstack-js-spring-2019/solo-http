const http = require('http');
const { parse } = require('url');
const request = require('superagent');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url);

  return request
    .get(`https://rickandmortyapi.com/api/character/${url.pathname.split('/')[2]}`)
    .then(response => {
      // console.log(url);
      // console.log(response);
      res.end(`
          Name: ${response.body.name} 
          Status: ${response.body.status} 
          Species: ${response.body.species}
          `);
    });
  
});
