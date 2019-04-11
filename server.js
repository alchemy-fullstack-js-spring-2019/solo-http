const http = require('http');
const { parse } = require('url');

http.createServer((req, res) => {
  const url = parse(req.url);
  console.log(url);
  console.log('Connected');


  const pattern = url.pathname;
  switch(pattern) {
    case '/birthday': 
      res.setHeader('Content-Type', 'text-html');
      res.end(`
      <html>
        <head>
          <title>HBD</title>
        </head>
        <body>
          <h1>HAPPY BIRTHDAY</h1>
        </body>
      </html>
      `);
      break;
    case '/tomorrow': 
      res.setHeader('Content-Type', 'text-html');
      res.end(`
        <html>
          <head>
            <title>Calm down</title>
          </head>
          <body>
            <h1>It's not your birthday yet</h1>
          </body>
        </html>
        `);
      break;
    default:
      res.setHeader('Content-Type', 'text-html');
      res.end(`
      <html>
        <head>
          <title>Nope</title>
        </head>
        <body>
          <h1>Don't look here</h1>
        </body>
      </html>
      `);
      break;
  }

  // if(url.pathname === '/birthday') {
  //   res.setHeader('Content-Type', 'text-html');
  //   res.end(`
  //   <html>
  //     <head>
  //       <title>HBD</title>
  //     </head>
  //     <body>
  //       <h1>HAPPY BIRTHDAY</h1>
  //     </body>
  //   </html>
  //   `);
  // } else if(url.pathname === '/tomorrow') {
  //   res.setHeader('Content-Type', 'text-html');
  //   res.end(`
  //   <html>
  //     <head>
  //       <title>Calm down</title>
  //     </head>
  //     <body>
  //       <h1>It's not your birthday yet</h1>
  //     </body>
  //   </html>
  //   `);
  // } else {
  //   res.status(404).end();
  // res.setHeader('Content-Type', 'text-html');
  // res.end(`
  // <html>
  //   <head>
  //     <title>Nope</title>
  //   </head>
  //   <body>
  //     <h1>Don't look here</h1>
  //   </body>
  // </html>
  // `);
  // }
}).listen(6969);
