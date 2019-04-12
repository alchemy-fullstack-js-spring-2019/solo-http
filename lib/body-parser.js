module.exports = req => {
  return new Promise((resolve, reject) => {
    if(req.method === 'GET' || req.method === 'DELETE') {
      return resolve();
    }
    //express and node to appease supertest 
    const headers = req.headers || req.getHeaders(); 
    if(headers['content-type'] !== 'application/json') {
      return reject('we only suppor JSON format');
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.once('end', () => {
      try {
        const json = JSON.parse(body);
        resolve(json);
      } catch(err) {
        reject(err);
      }
    });
    req.once('error', err => {
      reject(err);
    });
  });
};

//use try when you think something can or will throw an exception.
