module.exports = req => {
  return new Promise((resolve, reject) => {
    let body = '';

    if(req.method === 'GET' || req.method === 'DELETE') {
      resolve();
    }

    const headers = req.headers || req.getHeaders();
    if(headers['content-type'] !== 'application/json') {
      return reject('We only support JSON');
    }
    
    req.on('data', dataChunk => {
      body += dataChunk;
    });

    req.once('end', () => {
      const json = JSON.parse(body.toString());
      resolve(json);
    });

    req.on('error', err => {
      reject(err);
    });
  });
};
