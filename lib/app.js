const { parse } = require('url');


module.exports = ((req, res) => {
  const url = parse(req.url);

  const path = url.pathname;
  let message = '';

  switch(path) {
    case '/testing' : message = 'testing 123';
      break;
    case '/birthday' : message = 'Happy Birthday';
      break;
    case '/tomorrow' : message = 'Tomorrow, Tomorrow';
      break;
    case '/birthday/tomorrow' : message = 'Tomorrow is your birthday!!!';
      break;
  }

  res.end(`
    <html>
      <head>
        <tittle> HI </tittle>
      </head>
      <body>
        <p>${message}</p>
      </body>
    </html>
  `);
});
