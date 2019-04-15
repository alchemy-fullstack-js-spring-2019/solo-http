module.exports = req => {
  return new Promise((resolve, reject) => {
    if(req.method === 'GET' || req.method === 'DELETE') {
      return resolve({});
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
        const json = JSON.parse(body);
        resolve(json);
      } catch(e) {
        reject(e); //error for when parsing the data errors
      }
    });

    req.once('error', err => {
      reject(err); //error for when the data stream errors
    });
  });
};
