const http = require('http');
const { parse } = require('url');
const request = require('superagent');

http.createServer((req, res) => {
  const url = parse(req.url);
  const pattern = /\/(?<path>\w*)\/:?(?<id>\w*)?/;
  const match = pattern.exec(url.path);
  if(!match || !match.groups) res.end('error');

  return request.get(`https://rickandmortyapi.com/api/character/${match.groups.id}`)
    .then(res => res.body)
    .then(results => {
      res.setHeader('Content-Type', 'application/json');  
      res.end(JSON.stringify(results));
    });
}).listen(1234);

