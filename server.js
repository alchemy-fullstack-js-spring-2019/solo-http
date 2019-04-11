const http = require('http');

// tcp uses SOCKETS
// request, response
http.createServer((req, res) => {

  console.log('We Linked!');



  res.end(`
    <html>
      <head>
        <title>Server</title>
      </head>
      <body>
      <style type="text/css">
        body {
          display: flex;
          justify-content: center;
          color: red;
          background-color: black; }
        h1 { text-align: center; }
      </style>
        <h1>Thanks for coming to my TedTalk</h1>
      </body>
    </html>
  `);
}).listen(4657, () => { console.log('Parker: server running'); });
