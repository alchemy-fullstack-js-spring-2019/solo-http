const http = require('http');
const { parse } = require('url');
const { getCharacter } = require('./service/getCharacter');
const people = require('./routes/people');
const cars = require('./routes/cars');


module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  res.send = obj => res.end(JSON.stringify(obj));

  const pathern = /\/(?<path>\w*)\/?(?<id>.*)/;
  const match = pathern.exec(url.pathname);
  const { groups: { path: path, id: id } } = match;
  req.id = id;
  
  res.setHeader('content-type', 'application/json');
  // Fancy thing that works if everything here was a model
  // const resources = {
  //   people,
  //   cars
  // };
  // resources[path](req, res);

  switch(path) {
    case 'tester':
      res.send({ testing: 123 });
      break;
    case 'you':
      res.send({ text: `hi there ${url.query.name}` });
      break;
    case 'character':
      getCharacter(req.id)
        .then(res.send);
      break;
    case 'people':
      people(req, res);
      break;
    case 'cars':
      cars(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.send('Not Found!');
  }
});
