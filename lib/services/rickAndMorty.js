const http = require('http');
const { parse } = require('url');
const request = require('superagent');

const rickNMorty = http.createServer((req, res) => {
    const url = parse(req.url, true);
    console.log(url);
    const query = (parse(req.url, true).query);
    console.log(query);
    const id = query.id;

    res.send = obj => res.end(JSON.stringify(obj));

    if(url.pathname.includes('/character/')){
        if(query.id){
            request
                .get(`https://rickandmortyapi.com/api/character/${id}`)
                .then(result => ({
                    name: result.body.name,
                    species: result.body.species,
                    status: result.body.status
                }))
                .then(character => res.send(character));
        }
    }
});

module.exports = {
    rickNMorty
};
