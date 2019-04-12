module.exports = req => {
  return new Promise((resolve, reject) => {

    if(req.method === 'GET' || req.method === 'DELETE') {
      return resolve();
    }

    const headers = req.headers || req.getHeaders();
    if(headers['content-type'] !== 'application/json') {
      return reject('We only support JSON');
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.once('end', () => {
      try {
        const json = JSON.parse(body.toString());
        resolve(json);
      } catch(err) {
        reject(err);
      }
    });

    req.on('error', err => {
      reject(err);
    });
  });
};
