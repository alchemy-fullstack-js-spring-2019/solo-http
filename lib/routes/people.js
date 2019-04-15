const People = require('../models/people');

function post(req, res){

  return People
    .create({ name: req.body.name })
    .then((createdPerson)=>{
      res.send(createdPerson);
    });
}

function get(req, res){

  if(req.id){
    People
      .findById(req.id)
      .then((foundPerson)=>res.send(foundPerson));

  } else {
    People
      .find()
      .then(allPeople => res.send(allPeople));
  }
}
function put(req, res){
  
  People  
    .findByIdAndUpdate(req.id, { name: req.body.name })
    .then((updatedObject=>res.send(updatedObject)));
}

function del(req, res){
  People
    .findByIdAndDelete(req.id)
    .then(deleteCount=>res.send(deleteCount));
}



const methods = {
  post,
  get,
  put,
  delete: del 
};


module.exports = (req, res) =>{
  const method = methods[req.method.toLowerCase()];
  method(req, res);

};
