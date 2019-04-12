const http = require('http');
// const uuid = require('uuid/v4');
// const { getCharacter } = require('./service/rick-morty');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const People = require('./models/People');

// const notes = {};
const app = http.createServer((req, res) => {
  res.send = json => {
    res.end(JSON.stringify(json));
  };
  const url = parse(req.url, true);
  
  res.setHeader('Content-Type', 'application/json');

  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(json => {
        return People.create((
          { 
            name: json.name, 
            age: json.age,
            color: json.color
          }));
      })
      .then(createdPerson => res.send(createdPerson));
  }

  if(url.pathname === '/people' && req.method === 'GET') {
    People.find()
      .then(people => res.send(people));
  }

  if(url.pathname.includes('/people/') && req.method === 'GET') {
    const id = url.pathname.split('/')[2];
    People.findById(id)
      .then(person => res.send(person))
      .catch(err => res.send(err));
  }

  if(url.pathname.includes('/people/') && req.method === 'PUT') {
    const id = url.pathname.split('/')[2];
    People.findByIdAndUpdate(id, url.body)
      .then((newPerson) => res.send(newPerson));
  }

  if(url.pathname.includes('/people/') && req.method === 'DELETE') {
    const id = url.pathname.split('/')[2];
    People.findByIdAndDelete(id)
      .then(data => res.send(data));
  }




  // if(url.pathname === '/note' && req.method === 'POST') {
  //   const id = uuid();
  //   bodyParser(req)
  //     .then(json => {
  //       notes[id] = { ...json, id };
  //       res.send(notes);
  //     });
  // } else if(url.pathname.includes('/character/')) {
  //   const id = url.pathname.split('/')[2];
  //   getCharacter(id)
  //     .then(character => {
  //       console.log(character);
  //       res.send(character);
  //     });
  // }
});

module.exports = app;
