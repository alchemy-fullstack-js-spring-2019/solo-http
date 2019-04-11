const express = require('express');
const app = express();


const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  if(url.path === '/birthday') {
    res.end('Happy Birthday!!!!');
  }
  if(url.path === '/tomorrow') {
    res.end('Tomorrow Tomorrow');
  }
  if(url.path === '/birthday/tomorrow') {
    res.end('Tomorrow birthday Tomorrow');
  }
  res.end('go to/birthday or/tomorrow for a present');
}).listen(7890);
