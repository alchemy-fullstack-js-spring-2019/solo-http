const app = require('./lib/app');
const { rickNMorty } = require('./lib/services/rickAndMorty');
// const mortyServer = require('./lib/services/rickAndMorty');
// http.createServer((request, response) => {
//     const url = parse(request.url);
//     console.log('client connected...' + url);
//     response.setHeader('Content-Type', 'text/plain');
//     response.end('Hello All');
// }).listen(3000);

// http.createServer((request, response) => {
//     const url = parse(request.url);
//     console.log('client connected...' + url);
//     response.setHeader('Content-Type', 'text-html');
//     response.end(`
//     <html>
//         <head>
//             <title>WORLD WIDE WEB</title>
//         </head>
//             <body>
//                 <h1>Thanks for visiting!</h1>
//             </body>
//     </html>
//     `);
// }).listen(3000);

app.listen(3000);
rickNMorty.listen(4000);
