const app = require('./lib/query-strings-app');
const http = require('http');
http.createServer(app).listen(7890);

