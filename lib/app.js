const { parse } = require('url');
// const uuid = require('uuid');
const bodyParser = require('./body-parser');
const People = require('./models/People');

// const notes = {};
module.exports = (req, res) => {
  res.send = json => res.end(JSON.stringify(json));

  const url = parse(req.url, true);
  const pattern = /\/(?<path>\w*)\/:?(?<id>.*)?/g;
  const match = pattern.exec(url.path);

  if(!match || !match.groups) res.end('error');
  if(match.groups.path === 'people' && match.groups.id) 
    switch(req.method) {
      case 'GET':
        People.findById(match.groups.id)
          .then(foundPerson => res.send(foundPerson));
        break;
      case 'DELETE':
        People.findByIdAndDelete(match.groups.id)
          .then(deleted => res.send(deleted));
        break;
      case 'PUT':
        bodyParser(req)
          .then(json => People.findByIdAndUpdate(match.groups.id, json))
          .then(result => res.send(result));
    } else
  if(match.groups.path && !match.groups.id) 
    switch(match.groups.path) {
      case 'people':
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
      case 'tester':
        res.setHeader('Content-Type', 'application/json');  
        res.send({ testing: '123' });
        break;
      default:
        res.setHeader('Content-Type', 'application/json');  
        res.send({ message: 'errors...' });
    }
};


