const http = require('http');
const { parse } = require('url');
const bodyParser = require('./body-parser');
const people = require('./routes/people');

const resources = {
    people
};

const app = http.createServer((request, response) => {
    const url = parse(request.url, true);

    response.setHeader('Content-Type', 'application/json');
    response.send = json => response.end(JSON.stringify(json));

    const id = url.pathname.split('/')[2];
    request.id = id;

    const resource = url.pathname.split('/')[1];
    const resourceRoutes = resources[resource];

    bodyParser(request)
        .then(body => {
            request.body = body;
            resourceRoutes(request, response);
        });
});


module.exports = app;
