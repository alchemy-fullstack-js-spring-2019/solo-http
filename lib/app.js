const { parse } = require('url');
// const uuid = require('uuid');
const bodyParser = require('./body-parser');
const People = require('./models/People');

// const notes = {};
module.exports = (req, res) => {
  res.send = json => res.end(JSON.stringify(json));

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
      .then(createdPerson => res.send(createdPerson));  
  }



  
  // if(url.pathname === '/note' && req.method === 'POST') {
  //   const id = uuid();
  //   bodyParser(req)
  //     .then(json => {
  //       notes[id] = { ...json, id };
  //       res.send(notes);
  //     });
  // } else
  // if(url.pathname === '/tester') {
  //   res.setHeader('Content-Type', 'application/json');  
  //   // res.setHeader('Content-Type', 'text/html');
  //   res.end(JSON.stringify({ testing: '123' }));
  //   // res.end('Testing 123');
  // } else 
  // if(url.query) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify({ text: `hi there ${url.query.name}` }));
  // }
};


