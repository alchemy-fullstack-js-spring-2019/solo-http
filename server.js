const app = require('./lib/rick-morty.app');
const http = require('http');
http.createServer(app).listen(7890);

