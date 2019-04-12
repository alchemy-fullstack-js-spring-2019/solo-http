const { app } = require('./lib/app.js');
const { rick } = require('./lib/rick.js');
const { peopleApp } = require('./lib/peopleApp.js');

app.listen(7890);
rick.listen(5000);
peopleApp.listen(8000);
