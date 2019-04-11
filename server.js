const { app } = require('./lib/app.js');
const { rick } = require('./lib/rick.js');

app.listen(7890);
rick.listen(5000);
