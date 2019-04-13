const { parse } = require('url');
const People = require('./models/People');
const http = require('http');
const bodyParser = require('./body-parser');
const people = require('./people');

const resources = {
    people
};


const app = http.createServer((req, res) => {
    res.send = json => {
        res.end(JSON.stringify(json));
    };

    const url = parse(req.url, true);
    const id = url.pathname.split('/')[2];
    req.id = id;

    const method = resources[people];

    res.setHeader('Content-Type', 'application/json');

    bodyParser(req)
        .then(body => {
            req.body = body,
            people(req, res);
        });


    // if(url.pathname === '/people' && req.method === 'POST') {
    //     bodyParser(req)
    //         .then(json => {
    //             return People.create({
    //                 name: json.name,
    //                 age: json.age,
    //                 color: json.color
    //             });
    //         })
    //         .then(createdPerson => {
    //             res.send(createdPerson);
    //         });
    // }
    // else if(url.pathname === '/people' && req.method === 'GET') {
    //     return People.find()
    //         .then(people => res.send(people));
    // }
    // else if(url.pathname.includes('/people/') && req.method === 'PUT') {
    //     const id = url.pathname.split('/')[2];
    //     bodyParser(req)
    //         .then(json => {
    //             return People.findByIdAndUpdate(id, {
    //                 name: json.name,
    //                 age: json.age,
    //                 color: json.color
    //             });
    //         })
    //         .then(updatedPerson => res.send(updatedPerson));
    // } 
    // else if(url.pathname.includes('/people/') && req.method === 'GET') {
    //     const id = url.pathname.split('/')[2];
    //     return People.findById(id)
    //         .then(person => res.send(person));
    // }
    // else if(url.pathname.includes('/people/') && req.method === 'DELETE') {
    //     const id = url.pathname.split('/')[2];
    //     return People.findByIdAndDelete(id)
    //         .then(deleted => res.send(deleted));
    // }
});


module.exports = app;


// module.exports = (req, res) => {
//     console.log('Connected in app');
//     const url = parse(req.url);
//     let response;
//     switch(url.pathname) {
//         case '/': 
//             res.setHeader('Content-Type', 'text/html');
//             response = `
//                 <html>
//                     <head><title>Hi</title></head>
//                     <body><h1>Hello World</h1></body>
//                 </html>
//             `;
//             break;
//         case '/birthday': 
//             res.setHeader('Content-Type', 'text/html');
//             response = 'Happy birthday';
//             break;
//         case '/tomorrow': 
//             res.setHeader('Content-Type', 'text/html');
//             response = `
//                 <html>
//                     <head><title>Tomorrow</title></head>
//                     <body><h1>Tomorrow, Tomorrow</h1></body>
//                 </html>
//                 `;
//             break;
//         case '/bonnie':
//         //set status
//             res.setHeader('Content-Type', 'application/json');
//             response = JSON.stringify({ name: 'Bonnie' });
//             break;
//         default:
//             res.setHeader('Content-Type', 'application/json');
//             response = JSON.stringify({ name: 'boop' });
//     }
//     res.end(response);
// };
