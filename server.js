const http = require('http');
const app = require('./lib/app.js');
const appJson = require('./lib/app.json.js');
const request = require('supertest');

app.listen(7890);
appJson.listen(4567);
