const http = require('http');
const { parse } = require('url');
const getCharacter = require('./service/getCharacter.js');

module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  res.send = obj => res.end(JSON.stringify(obj));

  console.log(url);
  res.setHeader('Content-type', 'application/json');
  if(url.pathname.includes('/character/')) {
    const id = url.pathname.slice(11);
    getCharacter(id)
      .then(character => res.send(character));
  }
  switch(url.pathname) {
    case '/tester':
      res.send({ testing: 123 });
      break;
    case '/you':
      res.send({ text: `hi there ${url.query.name}` });
      break;
  }
});
