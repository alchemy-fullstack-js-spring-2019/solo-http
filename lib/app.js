const http = require('http');
const { parse } = require('url');

const app = http.createServer((req, res) => {
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
    case '/birthday/tomorrow': 
      res.setHeader('Content-Type', 'text-html');
      res.end(`
        <html>
          <head>
            <title>Almost!!</title>
          </head>
          <body>
            <h1>Tomorrow is your birthday</h1>
          </body>
        </html>
        `);
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found');
      break;
  }
});


module.exports = {
  app
};
