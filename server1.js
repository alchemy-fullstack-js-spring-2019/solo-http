const app = require('./lib/app.js');
const http = require('http');

http.createServer(app).listen(7890);


