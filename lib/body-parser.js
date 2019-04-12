module.exports = req => {
  return new Promise((resolve, reject) => {
    if(req.method === 'GET' || req.method === 'DELETE') {
      return resolve();
    }

    //to handle supertest's json handling
    const headers = req.headers || req.getHeaders();
    if(headers['content-type'] !== 'application/json') {
      return reject('JSON-only zone');
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.once('end', () => {
      console.log(body);
      try {
        const json = JSON.parse(body);
        resolve(json);
      } catch(e) {
        reject(e);
      }
    });

    req.once('error', err => {
      reject(err);
    });
  });
};
