const http = require('http');
const { parse } = require('url');
const People = require('./models/People.js');
const bodyParser = require('./bodyParser.js');
//people 

//why are we destructoring parse here


module.exports = http.createServer((req, res) => {
  console.log('client connected');
  res.send = createdPersonJSON => res.end(JSON.stringify(createdPersonJSON));
  res.end('heyyy');
  const url = parse(req.url, true);
  //true makes the query property an object? to easily grab info?
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(JSONreq => {
        return People.create({
          name: JSONreq.name,
          age: JSONreq.age,
          color: JSON.color
        });
      })
      .then(createdPersonJSON => res.send(createdPersonJSON));
  }
  // console.log(url);
});


