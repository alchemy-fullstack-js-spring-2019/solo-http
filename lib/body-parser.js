module.exports = (req => {
    return new Promise((resolve, reject) => {
        if(req.method === 'GET' || req.method === 'DELETE'){
            return resolve({});
        }

        //to appease supertest
        const headers = req.headers || req.getHeaders();
        
        if(headers['content-type'] !== 'application/json') {
            return reject('We only support JSON');
        }

        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        //use try whenever something might throw an exception. kind of like if else. we'll try this, if it doesnt work, catch the error
        req.once('end', () => {
            try { 
                const json = JSON.parse(body);
                resolve(json);
            }
            catch(e) {
                reject(e);
            }
        });

        req.once('error', err => {
            reject(err);
        });
    });
    
});
