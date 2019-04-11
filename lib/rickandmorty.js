const http = require('http');
const app = require('./rmapp');

http.createServer(app)
    .listen(13186);
