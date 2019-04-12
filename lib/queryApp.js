const http = require('http');
const url = require('url');

const app = http.createServer((req, res) => {
  var urlParts = url.parse(req.url);
  res.setHeader('content-type', 'text/html');
