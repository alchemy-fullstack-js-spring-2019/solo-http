const MemoryDatabase = require('./models/Memory');
const http = require('http');
const { parse } = require('url');


module.exports = http.createServer((req, res) => {
    const url = parse(req.url, true);
    const query = url.query; 

}