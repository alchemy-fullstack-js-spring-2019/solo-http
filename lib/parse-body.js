module.exports = req => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.once('end', () => {
    resolve(JSON.parse(body));
  });

  req.once('error', reject);
});
