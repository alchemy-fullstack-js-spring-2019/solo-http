
const { parse } = require('url');

module.exports = (req, res) => {
  const url = parse(req.url);
  if(url.path === '/tester') 
  {
    res.end('testing123');
  }
 
};


