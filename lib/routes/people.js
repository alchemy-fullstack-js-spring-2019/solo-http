const People = require('../models/people');

function post(req, res){
  return People
    .create({ name: req.body.name })
    .then((createdPerson)=>{
      return res.end(JSON.stringify(createdPerson));
    });

}



const methods = {
  post,

};


module.exports = (req, res) =>{
  const method = methods[req.methods.toLowerCase()];
  method(req, res);

};
