const { parse } = require('url');
// const uuid = require('uuid');
const bodyParser = require('./body-parser');
const People = require('./models/People');

// const notes = {};
module.exports = (req, res) => {
  res.send = json => res.end(JSON.stringify(json));

  const url = parse(req.url, true);
  const pattern = /\/(?<pathname>\w*)\/:?(?<id>\w*)?/g;
  const match = pattern.match(url.pathname)
  const pathname = match.groups.pathname;
  const id = match.groups.id;
  switch(pathname) {
    case '/people':
      if(req.method === 'POST') {
        bodyParser(req)
          .then(json => {
            return People.create({
              name: json.name,
              age: json.age,
              color: json.color
            });
          })
          .then(createdPerson => res.send(createdPerson));  
      } else 
      if(req.method === 'GET') {
        People.find()
          .then(listOfPeople => res.send(listOfPeople));
      }    
      break;
    case '/tester':
      res.setHeader('Content-Type', 'application/json');  
      res.send({ testing: '123' });
      break;
    default:
      res.setHeader('Content-Type', 'application/json');  
      res.send({ message: 'errors...' });
  }


};


