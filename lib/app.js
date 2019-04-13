const http = require('http');

const { parse } = require('url');
const bodyParser = require('./body-parser');
const People = require('./models/People');
const peopleRoutes = require('./routes/people');


const app = http.createServer((req, res)=>{
  res.setHeader('Content-Type', 'application-jason');
  res.send = json => res.end(JSON.stringify(json));

  const url = parse(req.url, true);

  bodyParser(req)
    .then(body =>{
      req.body = body;
      peopleRoutes(req, res);
    });



  // if(url.pathname === '/people' && req.method === 'POST'){
  //   bodyParser(req)
  //     .then(json=>{
  //       return People.create({
  //         name: json.name,
  //         age : json.age,
  //         color: json.color
  //       });
  //     })
  //     .then(createdPerson=>res.send(createdPerson))
  //     .catch(console.log);
  // }
  // else if(url.pathname === '/people' && req.method === 'GET'){
  //   People.find()
  //   //res.end ends and sends stuff to front end.
  //     .then(res.end(JSON.stringify));

  // }
  
  // else if(url.pathname === '/people' && req.method === 'GET'){
  //   const id = url.query.id;
  //   People.findById(id)
  //     .then(res.end(JSON.stringify));
  // }
  // else if(url.pathname === '/people/' && req.method === 'PUT'){
  //   const id = url.query.id;
  //   bodyParser(req)
  //     .then(updatedObject=>{
  //       return People.findByIdAndUpdate(id, updatedObject);
  //     })
  //     .then(res.end(JSON.tringify));
  // }
  // else if(url.pathname === '/people/' && req.method === 'DELETE'){
  //   const id = url.query.id;
  //   People.findByIdAndDelete(id)
  //     .then(res.end(JSON.stringify));
  // }
});

module.exports = app;
