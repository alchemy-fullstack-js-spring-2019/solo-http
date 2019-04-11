const http = require('http');
const url = require('url');

const app = http.createServer((req, res) => {
  var urlParts = url.parse(req.url);
  res.setHeader('content-type', 'text/html');

  console.log(req.url, urlParts);
  switch(urlParts.pathname) {
    case '/birthday':
      birthday(req, res);
      break;
    case '/birthday/tomorrow':
      birthtomorrow(req, res);
      break;
    case '/holiday':
      holiday(req, res);
      break;
    case '/tester':
      tester(req, res);
      break;
    default:
      homepage(req, res);
      break;
  }

  console.log('connected');
  res.end('<html><body>Thanks for visiting!</body></html>');
});

function homepage(req, res) {
  res.end('homepage');
}
function birthday(req, res) {
  res.end('birthday');
}
function holiday(req, res) {
  res.end('holiday');
}
function birthtomorrow(req, res) {
  res.end('birthtomorrow');
}
function tester(req, res) {
  res.end('{ testing: 123 }');
}

module.exports = {
  app,
};
