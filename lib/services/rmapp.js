const { parse } = require('url');
const request = require('superagent');

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const url = parse(req.url);
    const path = url.pathname.split('/');
    let response;
    switch(path[1]) {
        case 'character': 
            request
                .get(`https://rickandmortyapi.com/api/character/${path[2]}`)
                .then(res => {
                    return {
                        name: res.body.name,
                        status: res.body.status,
                        species: res.body.species
                    };
                })
                .then(character => res.end(JSON.stringify(character)));
            break;
        default:
            response = JSON.stringify({ default: true });
            res.end(response);
    } 
};
