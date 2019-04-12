const { parse } = require('url');
// const pathAndId = require('./pathAndId');
// const pathOnly = require('./pathOnly.js');
const http = require('http');
const bodyParser = require('./body-parser');
const people = require('./routes/people');
   
// module.exports = (req, res) => {
//   res.send = json => res.end(JSON.stringify(json));
//   res.setHeader('content-type', 'application/json');
//   const url = parse(req.url, true);
//   const pattern = /\/(?<path>\w*)\/?(?<id>.*)?/g;
//   const match = pattern.exec(url.path);

//   if(!match || !match.groups) return res.end('error');

//   if(match.groups.path && match.groups.id) {
//     pathAndId(res, req, match);
//   }  else
//   if(match.groups.path && !match.groups.id) {
//     pathOnly(res, req, match);
//   }  
// };

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);

  res.setHeader('content-type', 'application/json');
  res.send = json => res.end(JSON.stringify(json));
  const id = url.pathname.split('/'[2]);
  req.id = id;

  bodyParser(req)
    .then(body => {
      req.body = body;
      people(req, res);
    });
});


module.exports = app;
