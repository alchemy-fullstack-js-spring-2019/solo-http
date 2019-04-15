const { parse } = require('url');
const pathAndId = require('./pathAndId');
const pathOnly = require('./pathOnly.js');


module.exports = (req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  res.setHeader('content-type', 'application/json');
  const url = parse(req.url, true);
  const pattern = /\/(?<path>\w*)\/?(?<id>.*)?/g;
  const match = pattern.exec(url.path);

  if(!match || !match.groups) return res.end('error');

  if(match.groups.path && match.groups.id) {
    pathAndId(res, req, match);
  }  else
  if(match.groups.path && !match.groups.id) {
    pathOnly(res, req, match);
  }  
};
