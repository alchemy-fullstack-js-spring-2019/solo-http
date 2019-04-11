const http = require('http');
const { parse } = require('url');
const { getCharacter } = require('./service/getCharacter');

http.createServer((req, res) => {
  const url = parse(req.url, true);
  res.send = json => res.end(JSON.stringify(json));
  if(url.pathname.includes('/character/')) {
    const pattern = /[0-9]+/;
    const id = url.pathname.match(pattern);
    getCharacter(id)
      .then(obj => {
        res.setHeader('Content-Type', 'application/json');
        res.send(obj);
      });
  }
}).listen(8080);
