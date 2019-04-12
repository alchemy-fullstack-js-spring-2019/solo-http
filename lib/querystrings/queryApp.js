const http = require('http');
const { parse } = require('url');
//const url = require('url');

const app = http.createServer((req, res) => {
  //const url = parse(http(req.url));
  // console.log(url);

  const querySearch = parse(req.url, true).query;

  
  if(querySearch.name === 'Krusty') { //=== 'you?name=Krusty'
    res.setHeader('Content-Type', 'application/json');
    console.error('This is the Krusty Query Page');
    res.end(`Hi there ${querySearch.name}!`);
  } else res.end('You are not Krusty!');
});

//res.end('tesh eqdifu'); //{ text: `Hi there ${querySearch.name}!` });

module.exports = { app };

// const http = require('http');
// const { parse } = require('url');

// const queryApp = http.createServer((req, res) => {
//   const query = parse(req.url, true).query;

//   if(query.name) {
//     res.end(`Hi there ${query.name}!`);
//   } else {
//     res.end('Hey there!');
//   }
// });

// module.exports = queryApp;
