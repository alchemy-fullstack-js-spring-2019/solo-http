const { parse } = require ('url');
const request = require('superagent');

module.exports = (req, res) =>{
  const url = parse(req.url, true);
  if(url.pathname === '/id')
  {
    const id = url.query.id;
    request
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res=>({
        name: res.body.name,
        status: res.body.status,
        species: res.body.species
      }))
      .then(character=>{
        res.end(JSON.stringify(character));
      });
   
  }
};


