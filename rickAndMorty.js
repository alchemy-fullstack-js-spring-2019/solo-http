const http = require('http');
const { parse } = require('url');
const getCharacter = require('./getCharacter');


http.createServer((req, res) => {

  const url = parse(req.url);
  const pattern = /\/(?<path>\w*)\/:?(?<id>\w*)?/;
  const match = pattern.exec(url.path);
  if(!match || !match.groups) res.end('error');

  if(match.groups.path === 'character') {
    return getCharacter(match.groups.id)  
      .then(results => {
        res.setHeader('Content-Type', 'text/html');  
        res.end(
          `<html>
            <body>
            <h1>${results.name}</h1>    
            <p>Is a ${results.status} ${results.species}</p>
            </body>
            </html>`
        );
      });
  } else {
    res.end('error');  
  }
}).listen(1234);

