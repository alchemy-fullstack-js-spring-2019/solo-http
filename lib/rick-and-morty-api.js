const http = require('http');
const uuid = require('uuid/v4');
const { parse } = require('url');
const bodyParser = require('../lib/body-parser');
const { findCharacter } = require('../lib/rick-and-morty-api');

const notes = {};

module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);

  res.send = json => res.end(JSON.stringify(json));

  if(url.pathname.includes('/character/')) {
    const id = url.pathname.split('/')[2];
    findCharacter(id)
      .then(obj => {
        res.setHeader('Content-type', 'application/json');
        res.send(obj);
      });
  } else if(url.pathname === '/note') {
    const id = uuid();
    bodyParser(id) 
      .then(json => {
        notes[id] = { ...json, id };
        res.send(notes);
      });
  }
});

