const http = require('http');
const { parse } = require('url');



function httpListener() {

  http.createServer((req, res) => {
    const url = parse(req.url);
  }).listen(7890);


}

module.exports = httpListener;
