const bodyParser = require('./body-parser');
const People = require('./models/People');
const Dogs = require('./models/Dogs');
const resources = {
  people: People,
  dogs: Dogs
};

function pathOnly(res, req, match) {
  const path = match.groups.path;
  if(req.method === 'POST') {
    bodyParser(req)
      .then(json => {
        return resources[path].create({
          name: json.name,
          age: json.age,
          color: json.color
        });
      })
      .then(created => res.send(created));  
  } else 
  if(req.method === 'GET') {
    return resources[path].find()
      .then(list => res.send(list));
  } else {
    res.send({ message: 'errors...' });
  }

}


module.exports = pathOnly;
