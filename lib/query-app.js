const http = require('http');
const { parse } = require('url');

const queryapp = http.createServer((req, res) => {
  const query = parse(req.url, true).query;

  if(query.name) {
    res.end(`Waaaaassssuuuup ${query.name}!!`);
  } else {
    res.end('Waaaaassssuuuup!!');
  }
});
module.exports = queryapp;  
