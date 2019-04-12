const http = require('http');
const { parse } = require('url');
const request = require('superagent');
const uuid = require('uuid/v4');
const bodyParser = require('./body-parser');
const People = require('./model/People');

const notes = {};

const app = http.createServer((req, res) => {
  
  //   res.end(JSON.stringify({ name: 'heidi' })); 
  const url = parse(req.url, true);
 
  //   console.log('wee woo', url);

  
  if(url.pathname.includes('/character/')) {
    const id = url.pathname.split('/')[2];
    console.log('wee woo', id);
    return request
      .get(`http:/rikandmortyapi.com/api/character/${id}`)
      .then(res => ({
        name: res.body.name,
        status: res.body.status,
        species: res.body.species
      })).then(character => res.send(character));

  }

  
  //   if(url.pathname === '/birthday') {
  //     res.end('happy birthday'); 
  //   } else if(url.pathname === '/welcome') {
  //     res.end('hello');
  //   }  else {
  //     res.statusCode = 200;
  //     res.end('ne trouvez pas!');  
  //   }


    
});

module.exports = app;

//   res.end(JSON.stringify({ name: 'me' }));