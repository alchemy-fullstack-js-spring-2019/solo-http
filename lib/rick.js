const http = require('http');
const { parse } = require('url');

const rick = http.createServer((req, res) => {
  const url = parse(req.url);
  res.write('gotcha');
  console.log(url);
});

module.exports = {
  rick
};
