const http = require('http');
const uuid = require('uuid/v4');
const { parse } = require('url');
const { getCharacter } = require('./service/getCharacter');

const notes = {};

module.exports = http.createServer((req, res) => {
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
  } else if(url.pathname === '/note' && req.method === 'POST') {
    const id = uuid();
    let body = '';
    
    req.on('data', dataChunk => {
      body += dataChunk;
    });

    req.once('end', () => {
      const json = JSON.parse(body.toString());
      notes[id] = { ...json, id };
      res.send(notes);
    });
  }
});
