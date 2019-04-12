module.exports = req => {
  return new Promise((resolve, reject) => {
    if(req.method === 'GET' || req.method === 'DELETE') {
      return resolve();
    }

    const headers = req.headers || req.getHeaders();
    if(headers['content-type'] !== 'aplication/json') {
      return reject('We only support Jason');
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.once('end', () => {
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
