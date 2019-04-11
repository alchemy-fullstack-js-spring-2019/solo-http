const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
  const url = parse(req.url);
//   res.setHeader('content type', 'text/html');
  console.log('wee woo', url);
  
//   if(url.pathname === '/birthday') {
//     res.end('happy birthday'); 
//   } else if(url.pathname === '/welcome') {
//     res.end('hello');
//   }  else {
//     res.statusCode = 200;
//     res.end('ne trouvez pas!');  
//   }
  res.end(JSON.stringify({ name: 'heidi' })); 


    
});

module.exports = app;

//   res.end(JSON.stringify({ name: 'me' }));