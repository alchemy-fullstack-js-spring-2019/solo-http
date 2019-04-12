const http = require('http');
const { parse } = require('url');
// const uuid = require('uuid');
const bodyParser = require('./body.parser');
const People = require('./models/People');
//

// 200 - ok
// 204 - ok but no content
// 301 - redirect
// 304 - redirect
// 400 - bad request
// 401 - unauthorized
// 403 - forbidden
// 404 - not found
// 500 - internal server error
// 503 - timeout


const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  res.setHeader('Content-Type', 'application/json');
  const url = parse(req.url, true);
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(json => {
        return People.create({
          name: json.name,
          age: json.age,
          color: json.color
        });
      })
      .then(newPerson => {
        res.send(newPerson);
      });
  } else if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));
  } else if(url.pathname === '/people/' && req.method === 'GET') {
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(person => res.send(person));
  }

  // const query = url.query; 

  // /if(url.pathname === '/people') and req.method === post then
  // bodyparser(req)
  //   .then json => return people.create( {object with properties of what we expect them to send us})
  // then(created person => res.send the createdperson)

  
  // console.log(query);
  // switch(url.path) {
  //   case '/tester':
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(JSON.stringify({ 'firstName': 'mister', 'lastName': 'Testy' }));
  //     break;

  //   case `/you?name=${query.name}`:
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(JSON.stringify({ 'text': `hi there ${query.name}` }));
  //     break;

  //   default:
  //     res.statusCode = 404;
  //     res.end(`Sorry buuuuut....:${res.statusCode}`);
  //     break;
  // }
});


module.exports = app;
