const http = require('http');
const app = require('./services/rmapp');

http.createServer(app)
    .listen(13186);
