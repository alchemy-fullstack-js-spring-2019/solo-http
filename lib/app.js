const http = require('http');
const { parse } = require('url');
const { getCharacter } = require('./service/getCharacter');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  res.send = obj => res.end(JSON.stringify(obj));

  console.log(url);
  res.setHeader('Content-type', 'application/json');
  const pathern = /(?<path>\/\w*)\/?(?<id>\w*)/;
  const match = pathern.exec(url.pathname);
  const { groups: { path: path, id: id } } = match;

  switch(path) {
    case '/tester':
      res.send({ testing: 123 });
      break;
    case '/you':
      res.send({ text: `hi there ${url.query.name}` });
      break;
    case '/character':
      getCharacter(id)
        .then(character => res.send(character));
      break;
  }
});
