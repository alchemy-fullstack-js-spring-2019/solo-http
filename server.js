const app = require('./lib/app');
app.listen(8900);
const http = require('http');
http.createServer(app).listen(8900);

