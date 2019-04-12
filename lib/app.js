const http = require('http');
const uuid = require('uuid/v4');
const { getCharacter } = require('./service/rick-morty');
const bodyParser = require('./body-parser');
const { parse } = require('url');

const notes = {};
const app = http.createServer((req, res) => {
  res.send = json => {
    console.log(json);
    res.end(JSON.stringify(json));
  };

  const url = parse(req.url, true);

  res.setHeader('Content-Type', 'application/json');
  if(url.pathname === '/note' && req.method === 'POST') {
    const id = uuid();
    bodyParser(req)
      .then(json => {
        notes[id] = { ...json, id };
        res.send(notes);
      });
  } else if(url.pathname.includes('/character/')) {
    const id = url.pathname.split('/')[2];
    getCharacter(id)
      .then(character => {
        console.log(character);
        res.send(character);
      });
  }
});

module.exports = app;
