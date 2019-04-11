const http = require('http');
const request = require('superagent');
const { parse } = require('url');  //turns url into an object

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  res.setHeader('Content-Type', 'text/html');
  const url = parse(req.url, true);
  console.log(url);

  if(url.pathname.includes('/character/')) {
    res.setHeader('Content-Type', 'application/json');
    const id = url.pathname.split('/')[2];
    return request
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => ({
        name: res.body.name,
        status: res.body.status,
        species: res.body.species
      }))
      .then(character => res.send(character.name));
  }

  switch(url.pathname) {
    case '/birthday':
      res.end('Happy Birthday');
      break;
    case '/tomorrow':
      res.end('Tomorrow, tomorrow, tomorrow');
      break;
    case '/birthday/tomorrow':
      res.end('Tomorrow is your birthday, eh?');
      break;

    case '/tester':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ name: 'stitch' }));
      break;

    case '/you':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ text: `hello ${url.query.name}` }));
      break;

    default:
      res.statusCode = 404;
      res.end('absolutely not an option, not found');
  }
});

module.exports = app;
