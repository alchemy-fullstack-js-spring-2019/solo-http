module.exports = req => {
    return new Promise((resolve, reject) => {
        if(req.method === 'GET' || req.method === 'DELETE') {
            return resolve({});
        }

        const headers = req.headers || req.getHeaders(); //node and express way - can handle both cases - minor thing to appease supertest
        if(headers['content-type'] !== 'application/json') {  //node lowercases content-type - header is case insensitive
            return reject('We only support JSON');
        } 
        
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
    
        req.on('end', () => {
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
