const http = require('http');
const { parse } = require('url');
const request = require('superagent');
const getCharacter = require('./services/getCharacter');
//import body parser

module.exports = http.createServer((req, res) => {
  const url = parse(req.url, true);
  console.log(url);

  
  // switch(url.pathname) {
  //   case '/birthday':
  //     res.end('Happy Birthday!');
  //     break;
  //   case '/tomorrow':
  //     res.end('Tomorrow, Tomorrow');
  //     break;
  //   case '/birthday/tomorrow':
  //     res.end('Tomorrow is your birthday!');
  //     break;
  //   case '/you':
  //     res.end(`Hi there ${url.query.name}`);
  //     break;
  //   case '/character':
  //     getCharacter(url.query.id)
  //       .then(character => {
  //         console.log('it worked!!!');
  //         res.end(`${character.name}, ${character.status}, ${character.species}`);
  //       });
  //     break;
  // }
});
