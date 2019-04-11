const http = require('http');
const { parse } = require('url');

const server = http.createServer((req, res) => {
  const url = (parse(req.url));
  console.log(url);
  res.end(console.log(url));
}).listen(7890);

module.exports(server);
