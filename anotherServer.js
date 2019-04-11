const app = require('./lib/app');
const http = require('http');
const supertest = require('supertest');

http.createServer(app).listen(7890);
