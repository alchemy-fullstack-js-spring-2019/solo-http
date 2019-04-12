const http = require('http');
const { parse } = require('url');
const notes = {};

const app = http.createServer((req, res)) => {
  res.send = json => res.end(JSON.stringify(json));

  const url = parse(req.url, true);
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(json => {
        return People.create ({
          name: json.name,
          age: json.age,
          color: json.color
        });
      })
  }
}