const express = require('express');
const app = express();


const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  console.log('conneted!');
  res.end('HijlkjljlkjljljljjI!!!!!!!!!!!!');
}).listen(7890);
