module.exports = req => {
    return new Promise((resolve, reject) => {
        //nothing to parse if it's a GET or DELETE
        if(req.method === 'GET' || req.method === 'DELETE') {
            return resolve();
        }
  
        // req.headers is to appease supertest, req.getHeaders() is what is used functionally
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
                reject(e);
            }
        });
  
        req.once('error', err => {
            reject(err);
        });
    });
};
