const http = require('http');
const { parse } = require('url');
//const request = require('superagent');

const app = http.createServer((req, res) => {
  
  const url = parse(req.url, true);
  //unlike in the docs which say "url.parse(address, true)"
  //because 
  //url.query = returns the whole query as an OBJECT with the listed key/value pairs
  //url.parse = the whole url; vs parse(..).query is just the query
  //url.pathname = start of path after basic address (http://..../pathname)
  //url.search = 
  //url.host = the base address (WWW.YOUTUBE.COM)

  console.log(url);

  switch(url.pathname) {
    case '/you':
      console.log(url.query);
      res.end(url.query.name);
      //if not ended with res,end, needs to exit with "break;"
  }
});

module.exports = { app };

// use http.createServer to create a new http server
// respond to the following paths
// /character/:ID
// grab the id from the path
// make a request to the rick and morty api using superagent (get a character by ID)
// respond with the name, status, and species of the character as json
// HINT: set the content type
