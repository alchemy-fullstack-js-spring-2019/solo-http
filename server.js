const app = require('./lib/app');
const http = require('http');

http.createServer(app).listen(5500);



