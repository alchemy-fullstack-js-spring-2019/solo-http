const http = require('http');
const url = require('url');

const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));
  const url = parse(req.url, true);
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyPraser(req)
      .then( json => {
        return People.create({
          name: json.name,
          age: json.age,
          color: json.color
        });
  })
  .then(createdPerson => res.send(createdPerson));
}

// const app = http.createServer((req, res) => {
//   var urlParts = url.parse(req.url);

//   console.log(req.url, urlParts);
//   switch(urlParts.pathname) {
//     case '/birthday':
//       birthday(req, res);
//       break;
//     case '/birthday/tomorrow':
//       birthtomorrow(req, res);
//       break;
//     case '/holiday':
//       holiday(req, res);
//       break;
//     case '/tester':
//       res.setHeader('content-type', 'application/json');
//       tester(req, res);
//       break;
//     case `/you?name=${name}`:
//       youname(req, res);
//       break;
//     default:
//       homepage(req, res);
//       break;
//   }

//   console.log('connected');
//   res.end('<html><body>Thanks for visiting!</body></html>');
// });

// function homepage(req, res) {
//   res.end('homepage');
// }
// function birthday(req, res) {
//   res.end('birthday');
// }
// function holiday(req, res) {
//   res.end('holiday');
// }
// function birthtomorrow(req, res) {
//   res.end('birthtomorrow');
// }
// function tester(req, res) {
//   res.end(JSON.stringify({ testing: 123 }));
// }

// function youname(req, res) {
//   res.end(`hi my name is ${name}`)
// }

module.exports = {
  app,
};
