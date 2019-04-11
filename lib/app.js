const { parse } = require('url');


module.exports = (req, res) => {
  const url = parse(req.url);
  res.setHeader('Content-type', 'application/json');
  if(url.pathname === '/tester') {
    res.end(JSON.stringify({ 'testing': 123 }));
  }
  else {
    res.end(JSON.stringify('hi there'));
  }
};


