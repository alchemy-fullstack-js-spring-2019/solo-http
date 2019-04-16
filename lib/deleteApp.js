
// bring in other required shit...

const app = http.createServer((req, res) => {
  const url = parse(req.url, true);

  res.setHeader('Content-Type', 'application/json');

  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(body => {
        People
          .create({ name: body.name })
          .then(createdPerson => {
            res.end(JSON.stringify(createdPerson))
          });
      });
  }
});
