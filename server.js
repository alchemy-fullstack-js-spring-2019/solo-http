const app = require('./lib/app');
const jsonApp = require('./lib/app-json');
const http = require('http');

http.createServer(app, jsonApp).listen(5500);



