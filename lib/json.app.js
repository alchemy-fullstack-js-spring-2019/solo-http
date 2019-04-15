const { parse } = require('url');

module.exports = (req, res) => {
  const url = parse(req.url);
  if(url.path === '/tester')
  {
    const response = JSON.stringify({ testing: 123 });
    res.end(response);
  }
}
;
