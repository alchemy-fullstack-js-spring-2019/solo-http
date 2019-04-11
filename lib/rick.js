const http = require('http');
const { parse } = require('url');
const superagent = require('superagent');

const rick = http.createServer((req, res) => {
  const url = parse(req.url);
  const query = (parse(req.url, true).query);

  console.log(query.id);

  if(url.pathname === '/character/:ID'){
    if(!query.id){
      res.end('');
    }
    res.end('rick');
  }
});

module.exports = {
  rick
};
