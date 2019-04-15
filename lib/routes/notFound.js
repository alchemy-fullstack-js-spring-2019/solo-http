const { parse } = require('url');

module.exports = (req)=>{
  return new Promise ((resolve, reject)=>{
    const url = parse(req.url, true);
    if(url.pathname === '/people') {
      req.statusCode = 200;
      return resolve(req);
    }
    else if(url.pathname === '/people/') {
      req.statusCode = 200;
      return resolve(req);
    }
    else {
      req.statusCode = 404;
      return  reject(' ERROR 404, bad route');  
    }
  });
};
