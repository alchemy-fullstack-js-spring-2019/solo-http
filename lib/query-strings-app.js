
const { parse } = require('url');

module.exports = (req, res)=>{
  const url = parse(req.url, true);
  if(url.pathname === '/you')
  {
    console.log(url);
    //const name = url.name;
    res.end(`hi there ${url.query.name}`);
  }

};
