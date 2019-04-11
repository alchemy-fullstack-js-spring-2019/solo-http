const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  console.log('Connected!');
  const url = parse(req.url);
  console.log(url);
  res.setHeader('Content-Type', 'application/json');
//   res.end(`
//     <html>
//         <head><title>Hi</title></head>
//         <body><h1>Hello World</h1></body>
//     </html>
//   `);
    res.end(JSON.stringify({ name: 'Bonnie' }));
}).listen(7890);
