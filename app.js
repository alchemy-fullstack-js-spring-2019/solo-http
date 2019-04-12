const { parse } = require('url');
const uuid = require('uuid');
const bodyParser = require('./lib/body-parser');

const notes = {};
module.exports = (req, res) => {
  const url = parse(req.url, { parseQueryString: true });
  if(url.pathname === '/note' && req.method === 'POST') {
    const id = uuid();
    bodyParser(req)
      .then(json => {
        notes[id] = { ...json, id };
        res.send(notes);
      });
  } else
  if(url.pathname === '/tester') {
    res.setHeader('Content-Type', 'application/json');  
    // res.setHeader('Content-Type', 'text/html');
    res.end(JSON.stringify({ testing: '123' }));
    // res.end('Testing 123');
  } else 
  if(url.query) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ text: `hi there ${url.query.name}` }));
  }
};


