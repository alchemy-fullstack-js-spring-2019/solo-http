const { parse } = require('url');

module.exports = (req, res)=>{
  console.log(req.url);
  const url = parse(req.url);
  if(url.path === '/you?name=ryan')
  {
    const name = url.name;
    res.end(`hi there ${name}`);
  }

};
